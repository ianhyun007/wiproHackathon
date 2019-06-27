import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, 
        MatInputModule, MatDatepickerModule, MatNativeDateModule, 
        MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatButtonToggleModule,
        MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule,MatExpansionModule, MatStepperModule,
        MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatRadioModule, MatSnackBarModule} from '@angular/material'

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, 
                MatInputModule, MatDatepickerModule, MatNativeDateModule, 
                MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatStepperModule,
                MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule,MatExpansionModule, MatButtonToggleModule,
                MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatRadioModule, MatSnackBarModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, 
                MatInputModule, MatDatepickerModule, MatNativeDateModule, 
                MatCheckboxModule, MatSidenavModule, MatToolbarModule,MatListModule, MatStepperModule,
                MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule,MatExpansionModule, MatButtonToggleModule,
                MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatRadioModule, MatSnackBarModule]
})
export class MaterialModule {}
