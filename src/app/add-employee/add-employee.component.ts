import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../model/employee.service';
import { HttpServiceService} from '../service/http-service.service';
import {Router} from '@angular/router'; 
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public employee : EmployeeService = new EmployeeService;
  employeeFormGroup: FormGroup;

  departments: Array<any> = [
    {
      name: "HR",
      value: "HR"
    },
    {
      name: "Sales",
      value: "Sales"
    },
    {
      name: "Finance",
      value: "Finance"
    },
    {
      name: "Engineer",
      value: "Engineer"
    },
    {
      name: "Other",
      value: "Other"
    },
  ]
 

  constructor(private formBuilder: FormBuilder,  public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private httpService: HttpServiceService ,private router: Router,  @Inject(MAT_DIALOG_DATA) public data: any,) {
     
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      profilePic: new FormControl('' ,Validators.required),
      gender: new FormControl('', Validators.required),
      departments: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required) 
    });
  }

  onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('departments') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

  
  salaryOutput: number = 40000;
  updateSetting(event:any) {
    this.salaryOutput = event.value;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 10000) + 'k';
    }
    return value;
  }
 
   
  public checkError = (controlName: string, errorName: string) => {
    return this.employeeFormGroup.controls[controlName].hasError(errorName);
  }

  
  ngOnInit(): void {
    
    console.log(this.data);
    if(this.data!=null){
      this.employeeFormGroup.patchValue({
        name: this.data.name,
        profilePic: this.data.profilePic,
        gender: this.data.gender,
        salary:this.data.salary,
        note: this.data.note,
        departments: this.data.departments,
      
      });
    }
  }

  onSubmit(): void{
    
    if(this.data.employeeId!= undefined){
      console.log('inside if conditaton ');
      this.httpService.updateEmployeeData(this.data.employeeId,this.employeeFormGroup.value).subscribe(response=> {
        console.log(response);
        console.log(this.employeeFormGroup.value);    
      });
      
    }  
    else {
      console.log('inside else conditaton ');
    this.httpService.addEmployeeData(this.employeeFormGroup.value).subscribe(response=> {
      console.log(response);
      console.log(this.employeeFormGroup.value);
     
    });
    this.router.navigate(['']);
    
  }
  this.router.navigate(['']);
  this.dialogRef.close();
  }
}