package com.opensourcedev.backend.mapper;

import com.opensourcedev.backend.model.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {
    Integer getUserIDByName(String username);

    @Insert("INSERT INTO user (username, email, user_password, join_date) VALUES (#{user.username}, #{user.email}, #{user.userPassword}, #{user.joinDate})")
    void addUser(@Param("user") User user);

    @Select("SELECT id, username, email, user_password, join_date FROM user WHERE email = #{email}")
    @Results({
        @Result(property = "userId", column = "id"),
        @Result(property = "username", column = "username"),
        @Result(property = "email", column = "email"),
        @Result(property = "userPassword", column = "user_password"), // Explicit mapping for user_password
        @Result(property = "joinDate", column = "join_date")
    })
    User getUserByEmail(@Param("email") String email);
}
