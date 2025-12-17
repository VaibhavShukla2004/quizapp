package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.QuestionDao;
import com.example.demo.dao.QuizDao;
import com.example.demo.model.Question;
import com.example.demo.model.QuestionWrapper;
import com.example.demo.model.Quiz;
import com.example.demo.model.Response;

@Service 
public class QuizService {
    
    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<String> createQuiz(String category, int numberOfQuestions, String title, int marksForCorrectAnswer, int marksForWrongAnswer) {

        List<Question> questions = questionDao.findRandomQuestionsByCategory(category, numberOfQuestions);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quiz.setMarksForCorrectAnswer(marksForCorrectAnswer);
        quiz.setMarksForWrongAnswer(marksForWrongAnswer);
        quizDao.save(quiz);
        return new ResponseEntity <> ("success",HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(int id) {
        Quiz quiz = quizDao.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Question> questions = quiz.getQuestions();
        List<QuestionWrapper> questionWrappers = questions.stream().map(q -> new QuestionWrapper(
                q.getId(),
                q.getQuestionTitle(),
                q.getOption1(),
                q.getOption2(),
                q.getOption3(),
                q.getOption4()
        )).toList();

        return new ResponseEntity<>(questionWrappers, HttpStatus.OK);  
    }

    public ResponseEntity<Integer> calculateResult(int id, List<Response> responses) {
        Quiz quiz = quizDao.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Question> questions = quiz.getQuestions();
        int score = 0;

        for (int i = 0; i < questions.size(); i++) {
            Question question = questions.get(i);
            Response response = responses.get(i);
            if (question.getRightAnswer().equals(response.getResponse())) {
                score += quiz.getMarksForCorrectAnswer();
            }
            else {
                score += quiz.getMarksForWrongAnswer();
            }
        }

        return new ResponseEntity<>(score, HttpStatus.OK);
    }

    public ResponseEntity<String> deleteQuiz(int id) {
        Quiz quiz = quizDao.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        quizDao.delete(quiz);
        return new ResponseEntity<>("Quiz deleted successfully", HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<String> updateQuiz(int id, String title, int marksForCorrectAnswer, int marksForWrongAnswer) {
        Quiz quiz = quizDao.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        quiz.setTitle(title);
        quiz.setMarksForCorrectAnswer(marksForCorrectAnswer);
        quiz.setMarksForWrongAnswer(marksForWrongAnswer);
        quizDao.save(quiz);
        return new ResponseEntity<>("Quiz updated successfully", HttpStatus.OK);
    }

    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizDao.findAll();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    public ResponseEntity<Quiz> getQuizById(int id) {
        Quiz quiz = quizDao.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }
    
}
