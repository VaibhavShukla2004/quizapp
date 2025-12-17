package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.QuestionWrapper;
import com.example.demo.model.Quiz;
import com.example.demo.model.Response;
import com.example.demo.service.QuizService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/quiz")
public class QuizController {
    
    @Autowired
    QuizService quizService;

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable int id) {
        return quizService.getQuizById(id); 
    }
    

    @GetMapping("questions/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable int id) {
        return quizService.getQuizQuestions(id);
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateQuiz(@PathVariable int id, @RequestParam String title, @RequestParam int marksForCorrectAnswer, @RequestParam int marksForWrongAnswer) {
        return quizService.updateQuiz(id, title, marksForCorrectAnswer, marksForWrongAnswer);
    }

    @PostMapping
    public ResponseEntity<String> createQuiz(@RequestParam String category, @RequestParam int numberOfQuestions, @RequestParam String title, @RequestParam int marksForCorrectAnswer, @RequestParam int marksForWrongAnswer) {
        return quizService.createQuiz(category, numberOfQuestions, title, marksForCorrectAnswer, marksForWrongAnswer);
    }

    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable int id, @RequestBody List<Response> responses) {
        return quizService.calculateResult(id,responses);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuiz(@PathVariable int id) {
        return quizService.deleteQuiz(id);
    }
    
}
