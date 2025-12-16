package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.QuestionDao;
import com.example.demo.model.Question;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            List<Question> questions = questionDao.findAll();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public List<Question> getQuestionsByCategory(String category) {
        return questionDao.findByCategory(category);
    }

    public String addQuestion(Question question) {
        if (question != null) {
            questionDao.save(question);
            return "success";
        }
        return "failed";
    }

    public String deleteQuestion(int id) {
        if (questionDao.existsById(id)) {
            questionDao.deleteById(id);
            return "deleted";
        }
        return "not found";
    }

    public String updateQuestion(Question question) {
        if (question != null && questionDao.existsById(question.getId())) {
            questionDao.save(question);
            return "updated";
        }
        return "failed";
    }

    public Question getQuestionById(int id) {
        return questionDao.findById(id).orElse(null);
    }
 
}
