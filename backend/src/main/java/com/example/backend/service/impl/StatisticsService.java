package com.example.backend.service.impl;

import com.example.backend.dto.response.MonthlyStatisticsResponse;
import com.example.backend.dto.response.WeeklyStatisticsResponse;
import com.example.backend.entity.Logs;
import com.example.backend.entity.Users;
import com.example.backend.repository.LogsRepository;
import com.example.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    @Autowired
    private LogsRepository logsRepository;

    @Autowired
    private UsersRepository usersRepository;

    public WeeklyStatisticsResponse getWeeklyStatistics(Long userId, LocalDate startDate) {
        // 1. Tìm user để lấy goalCalories mặc định nếu ngày hôm đó log chưa có goal
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int defaultGoal = user.getGoalCalories() != null ? user.getGoalCalories() : 0;

        // 2. Tính khoảng thời gian 7 ngày (Tính từ start_date 00:00:00 đến ngày thứ 7 lúc 23:59:59)
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = startDate.plusDays(6).atTime(LocalTime.MAX);

        // 3. Lấy danh sách Logs từ DB
        List<Logs> logs = logsRepository.findByUserIdAndLoggedAtBetween(userId, startDateTime, endDateTime);

        // 4. Group dữ liệu: Tính tổng calo thực tế theo từng ngày (LocalDate)
        Map<LocalDate, Integer> caloriesByDate = logs.stream()
                .collect(Collectors.groupingBy(
                        log -> log.getLoggedAt().toLocalDate(),
                        Collectors.summingInt(log -> log.getTotalCalories() != null ? log.getTotalCalories().intValue() : 0)
                ));

        // 5. Group dữ liệu: Tìm goalCalories của từng ngày từ Logs
        // Sắp xếp lấy log mới nhất trong ngày để lấy mục tiêu chuẩn nhất của ngày hôm đó
        Map<LocalDate, Integer> goalByDate = logs.stream()
                .collect(Collectors.groupingBy(
                        log -> log.getLoggedAt().toLocalDate(),
                        Collectors.collectingAndThen(
                                Collectors.maxBy((l1, l2) -> l1.getLoggedAt().compareTo(l2.getLoggedAt())),
                                optLog -> optLog.map(Logs::getGoalCalories).orElse(null)
                                // Trả về null nếu log của ngày đó không lưu goalCalories
                        )
                ));

        // 6. Khởi tạo các list kết quả
        List<String> labels = new ArrayList<>();
        List<Integer> calories = new ArrayList<>();
        List<Integer> goals = new ArrayList<>();

        // 7. Loop đủ 7 ngày để ép dữ liệu ra đúng tuần tuần tự
        for (int i = 0; i < 7; i++) {
            LocalDate currentDay = startDate.plusDays(i);

            labels.add(String.valueOf(currentDay.getDayOfMonth()));
            calories.add(caloriesByDate.getOrDefault(currentDay, 0));

            // Logic check Goal:
            // Nếu trong Map có lưu goal của ngày đó -> Lấy từ Map
            // Nếu Map trả về null hoặc ngày đó không có log -> Lấy defaultGoal từ User profile
            Integer dayGoal = goalByDate.get(currentDay);
            if (dayGoal == null) {
                dayGoal = defaultGoal;
            }
            goals.add(dayGoal);
        }

        // 8. Đóng gói data trả về
        WeeklyStatisticsResponse.WeeklyData weeklyData = new WeeklyStatisticsResponse.WeeklyData(labels, calories, goals);
        return new WeeklyStatisticsResponse("Get weekly statistics success", weeklyData);
    }

    public MonthlyStatisticsResponse getMonthlyStatistics(Long userId, int year, int month) {
        // 1. Tìm user để lấy goalCalories mặc định
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int defaultGoal = user.getGoalCalories() != null ? user.getGoalCalories() : 0;

        // 2. Tính khoảng thời gian cả tháng (Từ ngày 1 tháng đó 00:00:00 đến hết ngày cuối cùng của tháng)
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        // 3. Lấy danh sách Logs từ DB
        List<Logs> logs = logsRepository.findByUserIdAndLoggedAtBetween(userId, startDateTime, endDateTime);

        // 4. Group dữ liệu: Tính tổng calo thực tế theo từng ngày (LocalDate)
        Map<LocalDate, Integer> caloriesByDate = logs.stream()
                .collect(Collectors.groupingBy(
                        log -> log.getLoggedAt().toLocalDate(),
                        Collectors.summingInt(log -> log.getTotalCalories() != null ? log.getTotalCalories().intValue() : 0)
                ));

        // 5. Group dữ liệu: Tìm goalCalories của từng ngày từ Logs
        // Sắp xếp lấy log mới nhất trong ngày để lấy mục tiêu chuẩn nhất của ngày hôm đó
        Map<LocalDate, Integer> goalByDate = logs.stream()
                .collect(Collectors.groupingBy(
                        log -> log.getLoggedAt().toLocalDate(),
                        Collectors.collectingAndThen(
                                Collectors.maxBy((l1, l2) -> l1.getLoggedAt().compareTo(l2.getLoggedAt())),
                                optLog -> optLog.map(Logs::getGoalCalories).orElse(null)
                        )
                ));

        // 6. Khởi tạo các list kết quả
        List<String> labels = new ArrayList<>();
        List<Integer> calories = new ArrayList<>();
        List<Integer> goals = new ArrayList<>();

        // 7. Loop đủ tất cả các ngày trong tháng
        for (int day = 1; day <= endDate.getDayOfMonth(); day++) {
            LocalDate currentDay = startDate.withDayOfMonth(day);

            labels.add(String.valueOf(day));
            calories.add(caloriesByDate.getOrDefault(currentDay, 0));

            // Logic check Goal:
            // Nếu trong Map có lưu goal của ngày đó -> Lấy từ Map
            // Nếu Map trả về null hoặc ngày đó không có log -> Lấy defaultGoal từ User profile
            Integer dayGoal = goalByDate.get(currentDay);
            if (dayGoal == null) {
                dayGoal = defaultGoal;
            }
            goals.add(dayGoal);
        }

        // 8. Đóng gói data trả về
        MonthlyStatisticsResponse.MonthlyData monthlyData = new MonthlyStatisticsResponse.MonthlyData(labels, calories, goals);
        return new MonthlyStatisticsResponse("Get monthly statistics success", monthlyData);
    }
}
