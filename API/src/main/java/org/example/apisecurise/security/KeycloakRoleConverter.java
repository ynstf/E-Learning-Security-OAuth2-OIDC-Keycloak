package org.example.apisecurise.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class KeycloakRoleConverter implements Converter> {

@Override
@SuppressWarnings("unchecked")
public Collection convert(Jwt jwtToken) {
    Map realmData = jwtToken.getClaim("realm_access");

    if (realmData == null || !realmData.containsKey("roles")) {
        return Collections.emptyList();
    }

    List userRoles = (List) realmData.get("roles");

    return userRoles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
            .collect(Collectors.toList());
}
}