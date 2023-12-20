package com.opensourcedev.backend.mapper;

import com.opensourcedev.backend.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    Integer getUserIDByName(String username);

    List<User> checkDuplicateRegistration(String newUsername, String newUserEmail);

    void addNewUser(User newUser);

    User getUserByEmail(String email);
}
