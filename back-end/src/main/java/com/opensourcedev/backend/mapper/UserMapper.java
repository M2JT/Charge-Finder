package com.opensourcedev.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
  Integer getUserIDByName(String username);
}
