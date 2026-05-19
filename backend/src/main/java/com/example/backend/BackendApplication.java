package com.example.backend;

import com.example.backend.admin.config.AdminBootstrapProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;

import java.util.TimeZone;

@SpringBootApplication
@EnableCaching
@EnableConfigurationProperties(AdminBootstrapProperties.class)
public class BackendApplication {

	public static void main(String[] args) {
		// toàn bộ ứng dụng Java chạy theo múi giờ UTC thay vì lấy múi giờ máy tính
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(BackendApplication.class, args);
	}

}
