/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { postProperty } from "../../../../../utils/apiCall";
import Header from "../../../../common/header/dashboard/Header";
import SidebarMenu from "../../../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import ResidentialDescription from "./ResidentialDescription";
import ResidentialDetails from "./ResidentialDetails";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../../../utils/firebase";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const descriptionObject = {
    "Bedroom": {
      descriptionName: "Bedroom",
      descriptionValue: 0
    },
    "Bathroom": {
      descriptionName: "Bathroom",
      descriptionValue: 0
    },
    "Electrical Power": {
      descriptionName: "Electrical Power",
      descriptionValue: 0
    },
    "Total Storeys": {
      descriptionName: "Total Storeys",
      descriptionValue: 0
    },
    "Compass Direction": {
      descriptionName: "Compass Direction",
      descriptionValue: "North"
    },
  };
  const detailsObject = {};
  const clusterFacilities = {};
  const imageObject = {
    image: "",
    imageList: [],
  };

  let property = {
    description: [],
    propertyDetails: [],
    clusterFacilities: [],
    category: "Residential",
    image: "",
    imageList: [],
  };

  const onImageChangeListener = (imageList) => {
    imageObject.image = imageList[0];
    imageObject.imageList = imageList;
    // console.log(imageObject);
  };

  const onChangeListener = (key, value) => {
    property[key] = value;
  };

  const onDescriptionObjectChangeListener = (key, value, name) => {
    descriptionObject[name] = {
      descriptionName: name,
      descriptionValue: value,
    };
    // console.log(descriptionObject);
  };

  const onDetailsObjectChangeListener = (key, value, name, icon) => {
    detailsObject[name] = {
      detailName: name,
      detailData: value,
      detailIcon: icon,
    };
  };

  const onPropertyFacilitiesChangeListener = (key, isChecked, name, icon) => {
    if (isChecked) {
      clusterFacilities[name] = {
        facilityName: name,
        facilityIcon: icon,
      };
    } else {
      delete clusterFacilities[name];
    }
  };

  const [formError, setFormError] = useState({});
  const [oldProperty, setOldProperty] = useState({});
  const validate = () => {
    let err = {};
    if (property.name === "" || property.name === undefined) {
      err.name = "Property Name is required!";
    }
    if (property.price === "" || property.price === undefined) {
      err.price = "Property Price is required!";
    }
    if (property.landArea === "" || property.landArea === undefined) {
      err.landArea = "Property Land Area is required!";
    }
    if (property.buildingArea === "" || property.buildingArea === undefined) {
      err.buildingArea = "Property Building Area is required!";
    }
    if (property.address === "" || property.address === undefined) {
      err.address = "Property Address is required!";
    }
    if (property.province === "" || property.province === undefined) {
      err.province = "Property Province is required!";
    }
    if (property.area === "" || property.area === undefined) {
      err.area = "Property Area is required!";
    }
    if (property.exploreCity === "" || property.exploreCity === undefined) {
      err.exploreCity = "Property Explore City is required!";
    }
    if (property.city === "" || property.city === undefined) {
      err.city = "Property City is required!";
    }
    if (property.zip === "" || property.zip === undefined) {
      err.zip = "Property Zip is required!";
    }
    if (property.long === "" || property.long === undefined) {
      err.long = "Property Long is required!";
    }
    if (property.lat === "" || property.lat === undefined) {
      err.lat = "Property Latitude is required!";
    }
    if (property.category === "" || property.category === undefined) {
      err.category = "Property Category is required!";
    }
    setOldProperty({ ...property });
    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  useEffect(() => {
    property = oldProperty;
    // console.log(property);

    return () => {};
  }, [oldProperty]);

  const onSubmit = () => {
    property.description = Object.entries(descriptionObject).map(
      (value) => value[1]
    );
    property.propertyDetails = Object.entries(detailsObject).map(
      (value) => value[1]
    );
    property.clusterFacilities = Object.entries(clusterFacilities).map(
      (value) => value[1]
    );

    const isValid = validate();

    if (isValid) {
      // Firebase
      const storage = getStorage(app);

      async function uploadImageAsPromise(file, index) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const task_1 = await new Promise(function (resolve, reject) {
          //Upload file
          var task = uploadBytesResumable(storageRef, file);

          //Update progress bar
          task.on(
            "state_changed",
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function error(err) {
              reject(err);
            },
            function complete() {
              resolve(task);
            }
          );
        });
        const downloadURL = await getDownloadURL(task_1.ref);
        property.imageList[index] = downloadURL;
        if (index == 0) {
          property.image = downloadURL;
        }
        // console.log("Finished uploading file: " + fileName);
        return downloadURL;
      }

      async function uploadFiles(files) {
        await Promise.all(
          files.map((file, i) => uploadImageAsPromise(file, i))
        );
      }

      async function uploadImageAndPostProperty(files) {
        await uploadFiles(files);
        // console.log(property);
        postProperty(property);
        await router.push("/my-properties");
      }

      uploadImageAndPostProperty(imageObject.imageList);
    } else {
      event.preventDefault();
    }
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Add New Property</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Create Listing</h3>
                      </div>

                      <CreateList
                        onChangeListener={(key, value) =>
                          onChangeListener(key, value)
                        }
                        formError={formError}
                      />
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Location</h3>
                      </div>

                      <LocationField
                        onChangeListener={(key, value) =>
                          onChangeListener(key, value)
                        }
                        formError={formError}
                      />
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Detailed Information</h3>
                    </div>
                    <ResidentialDetails
                      onDetailsObjectChangeListener={(key, value, name, icon) =>
                        onDetailsObjectChangeListener(key, value, name, icon)
                      }
                      onPropertyFacilitiesChangeListener={(
                        key,
                        isChecked,
                        name,
                        icon
                      ) =>
                        onPropertyFacilitiesChangeListener(
                          key,
                          isChecked,
                          name,
                          icon
                        )
                      }
                    />
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property Images</h3>
                    </div>
                    <PropertyMediaUploader
                      onImageChangeListener={(imageList) =>
                        onImageChangeListener(imageList)
                      }
                    />
                  </div>
                  {/* <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Floor Plans</h3>
                      <button className="btn admore_btn mb30">Add More</button>
                    </div>
                    <FloorPlans />
                  </div> */}
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Description</h3>
                    </div>
                    <ResidentialDescription
                      onDescriptionObjectChangeListener={(key, value, name) =>
                        onDescriptionObjectChangeListener(key, value, name)
                      }
                    />
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="col-xl-12 mt20 me20">
                <div className="my_profile_setting_input">
                  <button className="btn btn2 float-end" onClick={onSubmit}>
                    Create Property
                  </button>
                </div>
              </div>

              <div className="row mt100">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
