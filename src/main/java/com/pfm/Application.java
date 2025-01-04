package com.pfm;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import static org.springframework.boot.SpringApplication.run;

/**
 * Created by yangyibo on 17/1/17.
 */


@EnableScheduling
@SpringBootApplication
@MapperScan("com.pfm.dao")
public class Application {
    public static void main(String[] args) throws Exception {



        Integer a=273;
        Integer b=273;
        System.out.println("***");
        if(a==b){
            System.out.println("true");
        }else {
            System.out.println("false");
        }
        ConfigurableApplicationContext run = run(Application.class, args);
    }

}