package com.immutech.ExerLytix.controller;

import java.net.Authenticator;
import java.time.LocalDate;
import java.util.Map;

import com.immutech.ExerLytix.entity.ExerciseLog;
import com.immutech.ExerLytix.repo.ExerciseLogRepository;
import com.immutech.ExerLytix.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.immutech.ExerLytix.dto.LoginDto;
import com.immutech.ExerLytix.entity.Member;
import com.immutech.ExerLytix.repo.MemberRepository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")

public class MemberController {

	@Autowired
	private MemberRepository repository;

	@Autowired
	private ExerciseLogRepository logRepo;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private RegistrationService registrationService;

	private final RestTemplate restTemplate = new RestTemplate();

	@GetMapping("/")
	public String testingFunc() {
		return "Welcome to ExerLytix, Testing Completed ....";
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Member member) {
		try {
			Member saved = registrationService.register(member);
			return ResponseEntity.ok(saved);
		} catch (RuntimeException ex) {
			return ResponseEntity
					.status(HttpStatus.CONFLICT)
					.body(ex.getMessage());
		}
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
		UsernamePasswordAuthenticationToken token =
				new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
		try {
			Authentication authenticate = authManager.authenticate(token);
			if (authenticate.isAuthenticated()) {

				// 1️⃣ Fetch user_id from DB
				Member member = repository.findByEmail(loginDto.getEmail());

				System.out.println("Till here code is working");

				if (member == null) {
					throw new RuntimeException("User not found");
				}

				if (!logRepo.existsByUserAndDate(member, LocalDate.now())) {
					ExerciseLog log = new ExerciseLog(member);
					logRepo.save(log);
				}

				int userId = member.getId();
				// 2️⃣ Send user_id to Python server
				String pythonServerUrl = "http://localhost:5000/set_user";
				Map<String, Integer> body = Map.of("user_id", userId);
				restTemplate.postForObject(pythonServerUrl, body, String.class);
				String base64Image = null;
				if (member.getProfileImage() != null) {
					base64Image = java.util.Base64.getEncoder().encodeToString(member.getProfileImage());
				}

				// ✅ Return all user details
				return ResponseEntity.ok(Map.of(
						"success", true,
						"message", "Login successful",
						"userId", userId,
						"name", member.getName(),
						"email", member.getEmail(),
						"profilePicture",base64Image
				));
				}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(Map.of("success", false, "message", "Invalid email or password"));
	}
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		if (email == null || email.isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
		}

		Member member = repository.findByEmail(email);
		if (member == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(Map.of("message", "Account with this email does not exist."));
		}

		// For simplicity, we are not sending OTP/email right now.
		// Frontend will navigate to ChangePassword if this returns 200 OK
		return ResponseEntity.ok(Map.of("message", "Email verified. Proceed to change password."));
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String newPassword = request.get("newPassword");

		if (email == null || newPassword == null || email.isEmpty() || newPassword.isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("message", "Email and new password are required"));
		}

		Member member = repository.findByEmail(email);
		if (member == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(Map.of("message", "Account not found"));
		}

		// ✅ Encrypt new password and save
		String encoded = passwordEncoder.encode(newPassword);
		member.setPassword(encoded);
		repository.save(member);

		return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
	}

	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(
			@RequestParam int userId,
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String password,
			@RequestParam(required = false) MultipartFile profileImage) {

		try {
			Member member = repository.findById(userId)
					.orElseThrow(() -> new RuntimeException("User not found"));

			if (name != null && !name.isEmpty()) {
				member.setName(name);
			}
			if (password != null && !password.isEmpty()) {
				String encodedPassword = passwordEncoder.encode(password);
				member.setPassword(encodedPassword);
			}
			if (profileImage != null && !profileImage.isEmpty()) {
				member.setProfileImage(profileImage.getBytes());
			}
			Member updatedMember = repository.save(member);
			String base64Image = null;
			if (updatedMember.getProfileImage() != null) {
				base64Image = java.util.Base64.getEncoder().encodeToString(updatedMember.getProfileImage());
			}

			return ResponseEntity.ok(Map.of(
					"message", "Profile updated successfully",
					"userId", updatedMember.getId(),
					"name", updatedMember.getName(),
					"email", updatedMember.getEmail(),
					"password", "(hidden for security)",
					"profileImage", base64Image
			));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("error", e.getMessage()));
		}
	}

}

