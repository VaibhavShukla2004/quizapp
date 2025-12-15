package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.Questiondao;
import com.example.demo.model.Question;

@Service
public class QuestionService {

    @Autowired
    Questiondao questiondao;

    public List<Question> getAllQuestions() {

        return questiondao.findAll();
    }
    
}
