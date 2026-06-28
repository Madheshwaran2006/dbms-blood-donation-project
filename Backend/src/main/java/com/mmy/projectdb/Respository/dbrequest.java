package com.mmy.projectdb.Respository;

import com.mmy.projectdb.models.requester;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface dbrequest extends MongoRepository<requester, String>{

}

