package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Question;
import java.util.List;


@Repository
public interface QuestionDao extends JpaRepository <Question,Integer> {
    
    List<Question> findByCategory(String category);
    
    List<Question> findByDifficultyLevel(String difficultyLevel);

    List<Question> findByQuestionTitle(String questionTitle);

    @Query(value="SELECT * FROM question WHERE category = :category ORDER BY RANDOM() LIMIT :numberOfQuestions", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(String category, int numberOfQuestions);
}
