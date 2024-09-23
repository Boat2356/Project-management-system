package com.example.demo.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Token;

public interface TokenRepository extends CrudRepository<Token, Integer> {

    @Query("""
            Select t from Token t inner join User u
            on t.user.id = u.id
            where t.user.id = :userId and t.loggedOut = false
    """)
    List<Token> findAllTokenByUser(Integer userId);
    Optional<Token> findByToken(String token);    
}
