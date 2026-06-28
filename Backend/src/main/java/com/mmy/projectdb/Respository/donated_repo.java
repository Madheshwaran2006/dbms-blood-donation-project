package com.mmy.projectdb.Respository;

import com.mmy.projectdb.models.donated;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface donated_repo extends MongoRepository<donated,String> {
}
