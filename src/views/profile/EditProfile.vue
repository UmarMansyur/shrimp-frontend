<template>
  <Parent>
    <Cover>
      <div class="overlay-content">
        <div class="text-end p-3">
          <div class="p-0 ms-auto rounded-circle profile-photo-edit">
            <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input">
            <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
              <i class="ri-image-edit-line align-bottom me-1"></i> Change Cover
            </label>
          </div>
        </div>
      </div>
    </Cover>
    <div class="row">
      <div class="col-xxl-3">
        <div class="card mt-n5">
          <div class="card-body p-4">
            <div class="text-center">
              <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                <img src="/assets/images/users/avatar-1.jpg"
                  class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">
                <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                  <input id="profile-img-file-input" type="file" class="profile-img-file-input">
                  <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
                  </label>
                </div>
              </div>
              <h5 class="fs-16 mb-1">Anna Adame</h5>
              <p class="text-muted mb-0">Peternak Udang</p>
            </div>
          </div>
        </div>
        <!--end card-->
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-5">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Lengkapi Profile Anda</h5>
              </div>
            </div>
            <div class="progress animated-progress custom-progress progress-label">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 30%" aria-valuenow="30"
                aria-valuemin="0" aria-valuemax="100">
                <div class="label">30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
      <div class="col-xxl-9">
        <div class="card mt-xxl-n5">
          <div class="card-header">
            <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab" aria-selected="true">
                  <i class="fas fa-home"></i> Biodata Pengguna
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body p-4">
            <div class="tab-content">
              <div class="tab-pane active show" id="personalDetails" role="tabpanel">
                <form action="javascript:void(0);">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="fullname" class="form-label">Nama Lengkap: </label>
                        <input type="text" class="form-control" id="fullname" placeholder="Masukkan Nama Lengkap" autocomplete="false">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="email" class="form-label">Email: </label>
                        <input type="text" class="form-control" id="email" placeholder="Enter your lastname"
                          value="Adame">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="phonenumberInput" class="form-label">Phone Number</label>
                        <input type="text" class="form-control" id="phonenumberInput"
                          placeholder="Enter your phone number" value="+(1) 987 6543">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="Enter your email"
                          value="daveadame@velzon.com">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label for="JoiningdatInput" class="form-label">Joining Date</label>
                        <input type="text" class="form-control flatpickr-input" data-provider="flatpickr"
                          id="JoiningdatInput" data-date-format="d M, Y" data-deafult-date="24 Nov, 2021"
                          placeholder="Select date">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label for="skillsInput" class="form-label">Skills</label>
                        <div class="choices" data-type="select-multiple" role="combobox" aria-autocomplete="list"
                          aria-haspopup="true" aria-expanded="false">
                          <div class="choices__inner"><select class="form-control choices__input" name="skillsInput"
                              data-choices="" data-choices-text-unique-true="" id="skillsInput" tabindex="-1"
                              data-choice="active">
                              <option value="javascript" data-custom-properties="[object Object]">Javascript</option>
                            </select>
                            <div class="choices__list choices__list--multiple">
                              <div class="choices__item choices__item--selectable" data-item="" data-id="1"
                                data-value="javascript" data-custom-properties="[object Object]" aria-selected="true">
                                Javascript</div>
                            </div><input type="search" name="search_terms" class="choices__input choices__input--cloned"
                              autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox"
                              aria-autocomplete="list" aria-label="null">
                          </div>
                          <div class="choices__list choices__list--dropdown" aria-expanded="false">
                            <div class="choices__list" aria-multiselectable="true" role="listbox">
                              <div id="choices--skillsInput-item-choice-1"
                                class="choices__item choices__item--choice choices__item--selectable is-highlighted"
                                role="option" data-choice="" data-id="1" data-value="css"
                                data-select-text="Press to select" data-choice-selectable="" aria-selected="true">CSS
                              </div>
                              <div id="choices--skillsInput-item-choice-2"
                                class="choices__item choices__item--choice choices__item--selectable" role="option"
                                data-choice="" data-id="2" data-value="html" data-select-text="Press to select"
                                data-choice-selectable="">HTML</div>
                              <div id="choices--skillsInput-item-choice-3"
                                class="choices__item choices__item--choice choices__item--selectable" role="option"
                                data-choice="" data-id="3" data-value="illustrator" data-select-text="Press to select"
                                data-choice-selectable="">Illustrator</div>
                              <div id="choices--skillsInput-item-choice-5"
                                class="choices__item choices__item--choice choices__item--selectable" role="option"
                                data-choice="" data-id="5" data-value="photoshop" data-select-text="Press to select"
                                data-choice-selectable="">Photoshop</div>
                              <div id="choices--skillsInput-item-choice-6"
                                class="choices__item choices__item--choice choices__item--selectable" role="option"
                                data-choice="" data-id="6" data-value="php" data-select-text="Press to select"
                                data-choice-selectable="">PHP</div>
                              <div id="choices--skillsInput-item-choice-7"
                                class="choices__item choices__item--choice choices__item--selectable" role="option"
                                data-choice="" data-id="7" data-value="python" data-select-text="Press to select"
                                data-choice-selectable="">Python</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="designationInput" class="form-label">Designation</label>
                        <input type="text" class="form-control" id="designationInput" placeholder="Designation"
                          value="Lead Designer / Developer">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="websiteInput1" class="form-label">Website</label>
                        <input type="text" class="form-control" id="websiteInput1" placeholder="www.example.com"
                          value="www.velzon.com">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="cityInput" class="form-label">City</label>
                        <input type="text" class="form-control" id="cityInput" placeholder="City" value="California">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="countryInput" class="form-label">Country</label>
                        <input type="text" class="form-control" id="countryInput" placeholder="Country"
                          value="United States">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="zipcodeInput" class="form-label">Zip Code</label>
                        <input type="text" class="form-control" minlength="5" maxlength="6" id="zipcodeInput"
                          placeholder="Enter zipcode" value="90011">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3 pb-2">
                        <label for="exampleFormControlTextarea" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea"
                          placeholder="Enter your description"
                          rows="3">Hi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.</textarea>
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="hstack gap-2 justify-content-end">
                        <button type="submit" class="btn btn-primary">Updates</button>
                        <button type="button" class="btn btn-soft-success">Cancel</button>
                      </div>
                    </div>
                    <!--end col-->
                  </div>
                  <!--end row-->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
  </Parent>
</template>

<script setup lang="ts">
import Parent from '../Parent.vue';
import Cover from './Cover.vue';
</script>