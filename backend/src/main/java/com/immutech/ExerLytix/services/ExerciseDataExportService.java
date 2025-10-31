package com.immutech.ExerLytix.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.immutech.ExerLytix.dto.ExtractLogDTO;
import com.immutech.ExerLytix.entity.ExerciseLog;
import com.immutech.ExerLytix.repo.ExerciseLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseDataExportService {

    @Autowired
    private ExerciseLogRepository logRepo;

    // Path from backend folder to frontend JSON file (adjust if your folder layout differs)
    private static final String FRONTEND_JSON_PATH = "../frontend/src/data/workoutData.json";

    public String exportAllLogsToFrontendJson(Integer userId) {
        try {
            List<ExerciseLog> logs = logRepo.findByUserId(userId);

            List<ExtractLogDTO> dtoList = logs.stream().map(log -> new ExtractLogDTO(
                    log.getDate(),
                    log.getPushUp(),
                    log.getPullUp(),
                    log.getSquat(),
                    log.getWalk(),
                    log.getSitUp(),
                    log.getBicepCurl(),
                    log.getShoulderPress(),
                    log.getShoulderRaise(),
                    log.getCalories()

            )).collect(Collectors.toList());

            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.enable(SerializationFeature.INDENT_OUTPUT);

            File file = new File(FRONTEND_JSON_PATH);
            // ensure parent dir exists
            File parent = file.getParentFile();
            if (parent != null && !parent.exists()) parent.mkdirs();

            mapper.writeValue(file, dtoList);

            return "Exported " + dtoList.size() + " records to " + file.getAbsolutePath();
        } catch (Exception e) {
            e.printStackTrace();
            return "Export failed: " + e.getMessage();
        }
    }
}
