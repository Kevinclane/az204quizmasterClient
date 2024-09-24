import { Component, Input } from "@angular/core";
import { ActiveQAResult } from "../../models/active-qa-results.model";
import { CommonModule } from "@angular/common";


@Component({
    template: `
        <div class="container" (click)="toggleExpand()">
            <div *ngIf="expanded">
                exp
            </div>
            <div *ngIf="!expanded">
                col
            </div>
            <div *ngIf="expanded; then expanded else collapsed"></div>
            <ng-template class="expanded" #expanded>
                <span class="material-icons button-toggle">
                    keyboard_arrow_up
                </span>
            </ng-template>
            <ng-template class="collapsed" #collapsed>
                <span class="material-icons button-toggle">
                    keyboard_arrow_down
                </span>
            </ng-template>
        </div>
    `,
    selector: 'app-quiz-results-expanded',
    standalone: true,
    styleUrl: './quiz-results-expanded.component.scss',
    imports: [CommonModule]
})

export class QuizResultsExpandedComponent {
    @Input() activeQA!: ActiveQAResult;
    expanded: boolean = false;

    toggleExpand() {
        this.expanded = !this.expanded;
    }

    ngOnInit() {
        console.log(this.expanded)
    }
}