import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileApi from "../../../api/profile.api";

import InputProfile from "../../../components/Input/inputprofile.component";
import { BE_URL } from "../../../utils/constants";

const ProfilePage = () => {
  const {
    profile: { avatar, created_at, fullname },
  } = useSelector((state) => state.user);
  // console.log(profile);
  const [userBio, setUserBio] = useState(null);
  useEffect(() => {
    ProfileApi.getBio().then((res) => {
      setUserBio(res.data.bio);
    });
  }, []);
  if (!userBio) return null;

  const { headline, bio, website, facebook, youtobe, linkedin, twitter } =
    userBio;

  return (
    <div className="profile-page">
      <div className="profile-banner transparent-bgr">
        <div className="banner-wrap">
          <div className="title">Profile & settings</div>
        </div>
      </div>
      <div className="profile-main">
        <div className="main-wrap">
          <div className="bar">
            <div className="user">
              <form
                // action="{{ route('uploadAvatar') }}"
                method="POST"
                className="profile-avatar"
                enctype="multipart/form-data"
              >
                {/* @csrf */}
                {/* <label for="change-avatar" class="label-avatar">
              <img class="avatar" src="{{ asset($globalUser->avatar) }}" alt="" /></label>
            <input type="file" id="change-avatar" name="change-avatar"> */}
                <InputProfile
                  label={
                    <img
                      className="avatar"
                      src={BE_URL + "/" + avatar}
                      alt=""
                    />
                  }
                  name={"change-avatar"}
                  type={"file"}
                  classnamelabel={"label-avatar"}
                />
                {/* <label for="change-submit" class="change-avatar" class="save-avatar">Save</label>
            <input type="submit" value="Submit" id="change-submit"> */}
                <InputProfile
                  name={"change-submit"}
                  label={"Save"}
                  classnamelabel={"save-avatar change-avatar"}
                  type={"submit"}
                />
                <div className="meta">
                  <span id="name">{fullname}</span>
                  <span id="create_at">Ngày tạo: {created_at}</span>
                  {/* @error('avatar')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
              </form>
            </div>
          </div>

          {/* @if (session('success'))
      <span class="message success">{{ session('success') }}</span>
    @elseif (session('fail'))
      <span class="message fail">{{ session('fail') }}</span>
    @endif */}

          <div className="form">
            <form
              action="{{ route('saveProfile') }}"
              method="POST"
              className="form-profile"
            >
              {/* @csrf */}
              <div className="title">Profile</div>
              <div className="form-group">
                <div className="group">
                  {/* <label for="fullname">Tên của bạn</label>
                  <input
                    class="@error('fullname') is-invalid @enderror"
                    type="text"
                    value="{{ old('fullname') ? old('fullname') : $globalUser->fullname }}"
                    name="fullname"
                  /> */}
                  <InputProfile
                    label={"Tên của bạn"}
                    type={"text"}
                    name={"full-name"}
                    value={fullname}
                  />
                  {/* @error('fullname')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
              </div>
              <button type="submit" className="btn btn-form">
                Save
              </button>
            </form>
            <form
              action="{{ route('changePassword') }}"
              method="POST"
              className="form-profile"
            >
              {/* @csrf */}
              <div className="title">Đổi mật khẩu</div>
              <div className="form-group">
                <div className="group">
                  {/* { <label for="old_password">Mật khẩu cũ</label> */}
                  {/* @error('message_password') */}
                  {/* <div class="message mb-1">{{ $message }}</div> */}
                  {/* @enderror
                  <input
                    value="{{ old('old_password') }}"
                    class="@error('old_password') is-invalid @enderror"
                    type="password"
                    id="old_password"
                    name="old_password"
                    placeholder=""
                  />  */}
                  <InputProfile
                    label={"Mật khẩu cũ"}
                    type={"password"}
                    name={"old_password"}
                  />
                  {/* @error('old_password')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="new_password">Mật khẩu mới</label>
                  <input
                    value="{{ old('new_password') }}"
                    class="@error('new_password') is-invalid @enderror"
                    type="password"
                    id="new_password"
                    name="new_password"
                    placeholder=""
                  /> */}
                  <InputProfile
                    label={"Mật khẩu mới"}
                    type={"text"}
                    name={"new_password"}
                  />
                  {/* @error('new_password')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
              </div>
              <button type="submit" className="btn btn-form">
                Save
              </button>
            </form>
            <form
              action="{{ route('changeBio') }}"
              method="POST"
              className="form-profile"
            >
              {/* @csrf */}
              <div className="title">Devco Profile</div>
              <div className="form-group">
                <div className="group">
                  {/* <label for="headline">Headline</label>
                  <input
                    value="{{ isset($globalUser->bio->headline) ? $globalUser->bio->headline : old('headline') }}"
                    class="@error('headline') is-invalid @enderror"
                    type="text"
                    id="headline"
                    name="headline"
                    placeholder=""
                  /> */}
                  <InputProfile
                    label={"Headline"}
                    type={"text"}
                    value={headline}
                    name={"headline"}
                  />
                  {/* @error('headline')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div class="group">
                  <label for="bio">Giới thiệu</label>
                  <textarea
                    id="bio"
                    cols="30"
                    rows="10"
                    className="@error('bio') is-invalid @enderror"
                    type="text"
                    name="bio"
                    placeholder=""
                  >
                    {/* {{ isset($globalUser->bio->bio) ? $globalUser->bio->bio : old('bio') }} */}
                    {bio}
                  </textarea>
                  {/* @error('bio')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="website">Website</label> */}
                  {/* <input type="text" id="website" name="website" placeholder=""
              value="{{ isset($globalUser->bio->website) ? $globalUser->bio->website : old('website') }}"
              > */}
                  <InputProfile
                    label={"Website"}
                    type={"text"}
                    name={"website"}
                    value={website}
                  />
                  {/* @error('new_password')
                  <div class=" message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="linkedIn">LinkedIn</label> */}
                  {/* <input type="text" id="linkedIn" 
            class="@error('linkedin') is-invalid @enderror" name=" linkedIn"
              placeholder=""
              value="{{ isset($globalUser->bio->linkedin) ? $globalUser->bio->linkedin : old('linkedin') }}"
              > */}
                  <InputProfile
                    label={"LinkedIn"}
                    type={"text"}
                    name={"linkedin"}
                    value={linkedin}
                  />
                  {/* @error('linkedin')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div class="group">
                  {/* <label for="youtube">Youtube</label> */}
                  {/* <input type="text" id="youtube" class="@error('youtube') is-invalid @enderror" name="youtube" placeholder=""
              value="{{ isset($globalUser->bio->youtube) ? $globalUser->bio->youtube : old('youtube') }}"> */}
                  <InputProfile
                    label={"Youtube"}
                    type={"text"}
                    name={"youtube"}
                    value={youtobe}
                  />
                  {/* @error('youtube')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="twitter">Twitter</label> */}
                  {/* <input type="text" id="twitter" name="twitter" class="@error('twitter') is-invalid @enderror" placeholder=""
              value="{{ isset($globalUser->bio->twitter) ? $globalUser->bio->twitter : old('twitter') }}"> */}
                  <InputProfile
                    label={"Twitter"}
                    type={"text"}
                    name={"twitter"}
                    value={twitter}
                  />
                  {/* @error('twitter')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="facebook">Facebook</label> */}
                  {/* <input type="text" id="facebook" name="facebook" class="@error('facebook') is-invalid @enderror"
              placeholder=""
              value="{{ isset($globalUser->bio->facebook) ? $globalUser->bio->facebook : old('facebook') }}"> */}
                  <InputProfile
                    label={"Facebook"}
                    type={"text"}
                    name={"facebook"}
                    value={facebook}
                  />
                  {/* @error('facebook')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
              </div>
              <button type="submit" className="btn btn-form">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
