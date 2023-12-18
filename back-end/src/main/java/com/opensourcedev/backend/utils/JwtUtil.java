package com.opensourcedev.backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
  private static final long EXPIRATION_TIME = 3_600_000; // 1 hour

  public static String generateToken(String username) {
    Map<String, Object> claims = new HashMap<>();
    return Jwts
      .builder()
      .setClaims(claims)
      .setSubject(username)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
      .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
      .compact();
  }

  public static String extractUsername(String token) {
    return extractClaims(token).getSubject();
  }

  public static Date extractExpiration(String token) {
    return extractClaims(token).getExpiration();
  }

  private static Claims extractClaims(String token) {
    return Jwts
      .parser()
      .setSigningKey(SECRET_KEY)
      .parseClaimsJws(token)
      .getBody();
  }

  public static boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}
