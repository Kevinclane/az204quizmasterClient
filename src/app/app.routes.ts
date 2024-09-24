import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { QuizResultsComponent } from './components/quizzes/quiz-results.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'quizzes', component: QuizzesComponent },
    { path: 'results/:quizId', component: QuizResultsComponent }
];
