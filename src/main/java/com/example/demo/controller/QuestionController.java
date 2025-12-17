package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Question;
import com.example.demo.service.QuestionService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        return questionService.getQuestionsByCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable int id) {
        return questionService.getQuestionById(id);
    }
    
    @GetMapping("/title/{questionTitle}")
    public ResponseEntity<List<Question>> getQuestionsByTitle(@PathVariable String questionTitle) {
        return questionService.getQuestionsByTitle(questionTitle);
    }

    @GetMapping("/difficulty/{difficultyLevel}")
    public ResponseEntity<List<Question>> getQuestionsByDifficultyLevel(@PathVariable String difficultyLevel) {
        return questionService.getQuestionsByDifficultyLevel(difficultyLevel);
    }

    @PostMapping
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {

        return questionService.addQuestion(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int id) {
        return questionService.deleteQuestion(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateQuestion(@PathVariable int id,
            @RequestBody Question question) {
        question.setId(id);
        return questionService.updateQuestion(question);
    }

}
