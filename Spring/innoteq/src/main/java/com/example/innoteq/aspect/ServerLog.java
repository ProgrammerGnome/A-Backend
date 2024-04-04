package com.example.innoteq.aspect;

import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.stream.Collectors;

/*
Ez az osztály az AOP segítségével logolja a szerveroldali konzolra az összes controller osztály összes műveletét.
Így növelve a kód átláthatóságát, nem szükséges sehol máshol szerveroldali logolással foglalkozni.
*/

@Aspect
@Component
@Log4j2
public class ServerLog {
    private static final String POINTCUT = "within(com.example.innoteq.controller.*)";
    @Around(POINTCUT)
    @SneakyThrows
    public Object logArroundExec(ProceedingJoinPoint pjp) {
        log.info("Before {}", constructLogMsg(pjp));
        var proceed = pjp.proceed();
        log.info("After {} with result: {}", constructLogMsg(pjp), proceed.toString());
        return proceed;
    }

    private String constructLogMsg(JoinPoint jp) {
        var args = Arrays.asList(jp.getArgs()).stream().map(String::valueOf).collect(Collectors.joining(",", "[", "]"));
        Method method = ((MethodSignature) jp.getSignature()).getMethod();
        var sb = new StringBuilder("@");
        sb.append(method.getName());
        sb.append(":");
        sb.append(args);
        return sb.toString();
    }

}