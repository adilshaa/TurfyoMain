import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ServiceService } from "../../../core/services/service.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-partner-registration",
  templateUrl: "./partner-registration.component.html",
  styleUrls: ["./partner-registration.component.css"],
})
export class PartnerRegistrationComponent implements OnInit {
  restaurantId: any;
  submitted!: boolean;
  PartnerRegistrationForm!: FormGroup;
  error?: string = "";
  prtnername!: string;
  prtneremail!: string;
  queryParamsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.restaurantId = this.route.queryParams.subscribe((prams) => {
      this.prtneremail = prams["email"];
      this.prtnername = prams["name"];

      console.log(this.prtneremail);
      this.formLoaders();
    });
  }
  formLoaders() {
    this.PartnerRegistrationForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      place: new FormControl("", [Validators.required]),
      owner_name: new FormControl("", [Validators.required]),
      owner_email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      owner_number: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    this.PartnerRegistrationForm.get("owner_name")?.patchValue(this.prtnername);
  }

  PartnersRegistration() {
    this.submitted = true;
    if (this.PartnerRegistrationForm.invalid) {
      return;
    }
    let registrationdata = this.PartnerRegistrationForm.getRawValue();

    console.log(registrationdata);

    this.service.ParnerRegistration(registrationdata);
  }
  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
