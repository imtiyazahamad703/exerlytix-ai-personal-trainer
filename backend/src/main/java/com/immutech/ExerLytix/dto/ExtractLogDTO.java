package com.immutech.ExerLytix.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExtractLogDTO {
    private LocalDate date;
    private int pushUp;
    private int bicepCurl;
    private int shoulderPress;
    private int shoulderRaise;
    private int pullUp;
    private int squat;
    private int walk;
    private int sitUp;
    private float calories;
}
