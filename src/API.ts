import { shuffleArray } from './utils'

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

// add answers property with array of strings
export type QuestionsState = Question & {answers: string[]}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {

    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`

    // await the fetch itself and await again to convert it to json
    const data = await (await fetch(endpoint)).json()

    // 
    return data.results.map((question: Question) => ({
        // uses all properties from question
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}