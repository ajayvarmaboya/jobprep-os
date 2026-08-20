package com.jobprepos.repository;

import com.jobprepos.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByCognitoSub(String cognitoSub);
    Optional<UserEntity> findByEmail(String email);
}
