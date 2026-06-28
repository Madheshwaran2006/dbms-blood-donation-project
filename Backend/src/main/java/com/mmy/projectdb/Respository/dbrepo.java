package com.mmy.projectdb.Respository;

import com.mmy.projectdb.models.users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface dbrepo extends MongoRepository<users,String> {
    Optional<users> findByEmail(String email);
    Optional<users> findByUsername(String username);
    Optional<users> findById(String user_id);

}
