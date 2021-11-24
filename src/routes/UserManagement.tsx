import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";
import { checkSignedInAction } from "../store/ducks/authDuck";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const classnames = require("classnames");

const companyList: Array<{ name: string; label: string }> = new Array(20)
  .fill(0)
  .map((_, i) => ({ name: `Company ${i}`, label: `company${i}` }));
const locations: Array<{ name: string; label: string }> = new Array(20)
  .fill(0)
  .map((_, i) => ({ name: `City ${i}`, label: `city${i}` }));

const useStyles = createUseStyles({
  alignEnd: {
    alignItems: "flex-end",
  },
  buttonsWrapper: {
    marginTop: "50px",
  },
  dropDownTrigger: {
    "& .p-dropdown-trigger": {
      background: "#87BCBF",
      "& .p-dropdown-trigger-icon": {
        color: "white",
      },
    },
    "&:not(.p-disabled):hover": {
      borderColor: "#87BCBF",
    },
    "&:not(.p-disabled).p-focus": {
      borderColor: "#87BCBF",
      boxShadow: "0 0 0 0.2rem #8ddadfb5",
    },
  },
});

const UserManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values1, setValues1] = useState<any>("");
  const [selectedCompany, setSelectedCompany] = useState<{ name: string; label: string } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{ name: string; label: string } | null>(null);

  useEffect(() => {
    dispatch(checkSignedInAction());
    setTimeout(() => {
      // notificationService.success("haiaa");
      // startLoader();
    }, 3000);
  }, [dispatch]);

  return (
    <div className="card p-pl-6 p-pr-6 p-pt-6">
      <div className="p-grid p-pl-4 p-pt-4">
        <div className="p-col-12 p-md-7 p-col-nogutter">
          <div className="card">
            <div>JOHN DOU</div>
            <div>
              <h2>APP USER MANAGEMENT</h2>
            </div>
            <div className="p-fluid p-grid">
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="inputtext">First Name</label>
                <InputText id="inputtext" value={values1} onChange={(e) => setValues1(e.target.value)} className="p-invalid" />
              </div>
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="inputtext">Last Name</label>
                <InputText id="inputtext" value={values1} onChange={(e) => setValues1(e.target.value)} />
              </div>
            </div>
            <div className="p-fluid p-grid p-dir-col">
              <div className="p-field p-col-6 p-md-12">
                <label htmlFor="inputtext" className="p-text-normal">
                  Email
                </label>
                <InputText id="inputtext" value={values1} onChange={(e) => setValues1(e.target.value)} />
              </div>
              <div className="p-field p-col-6 p-md-12">
                <label htmlFor="inputtext">Phone</label>
                <InputText id="inputtext" value={values1} onChange={(e) => setValues1(e.target.value)} />
              </div>
              <div className="p-field p-col-6 p-md-12">
                <label htmlFor="inputtext">Company</label>
                <Dropdown
                  className={classes.dropDownTrigger}
                  value={selectedCompany}
                  options={companyList}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  optionLabel="name"
                  placeholder="Select a Company"
                />
              </div>
              <div className="p-field p-col-6 p-md-12">
                <label htmlFor="inputtext">Location</label>
                <Dropdown
                  className={classes.dropDownTrigger}
                  value={selectedCity}
                  options={locations}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  optionLabel="name"
                  placeholder="Select a City"
                />
              </div>
            </div>
            <Button label="Save user information" className="p-text-sm p-button-info p-mt-2" />
          </div>
        </div>
        <div className={classnames("p-col-12 p-md-5 p-grid p-dir-col", classes.alignEnd)}>
          <div>
            <div>User ID</div>
            <div>123456</div>
          </div>
          <div className={classes.buttonsWrapper}></div>
          <Button label="Send reset password link" className="p-button-info p-mt-2" />
          <Button label="Delete user" className="p-button-info p-mt-2 p-button-danger" />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
