package com.todo.todoapp.service;

import com.todo.todoapp.dto.Request.LoginRequest;
import com.todo.todoapp.dto.Request.RegisterRequest;
import com.todo.todoapp.dto.Response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    void logout(String token);
}

