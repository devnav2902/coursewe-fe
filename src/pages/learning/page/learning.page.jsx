import React from "react";

const LearningPage = () => {
  return (
    <main className="main-content-wrapper">
      <div className="open-course-content">
        <button>
          <i className="fas fa-arrow-left"></i>
          <span>Course content</span>
        </button>
      </div>
      <div className="learning-content">
        <div className="video-content">
          <div className="video-player">
            <video controls>
              <source src="{{ asset($course->section[0]->lecture[0]->src) }}" />
            </video>
          </div>
        </div>
        <div className="sidebar-container">
          <div className="sidebar-container__header d-flex align-items-center">
            <div className="title">Course content</div>
            <button type="button" id="sidebar-close-btn">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="sections">
            {/* @foreach ($course->section as $key => $section)
          <div className="section" data-section="{{ $section->id }}">
            <div className="section__header d-flex">
              <div className="container">
                <div className="title-section">
                  Section {{ $section->order }}:&nbsp;
                  {{ $section->title }}</div>
                <div className="bottom">
                  <span>
                    <span
                      className="count">{{ $section->countProgress->count() }}</span>/{{ $section->lecture->count() }}
                  </span>
                  {{-- |
                                      <span className="duration">40min</span> --}}
                </div>
              </div>
              <button type="button">
                <i className="{{ $section->order == 1 ? 'show' : '' }} fas fa-chevron-down">
                </i>
              </button>
            </div>
            <div className="accordion-panel {{ $section->order == 1 ? '' : 'd-none' }}">
              @foreach ($section->lecture as $lecture)
                <li className="curriculum-item {{ $key == 0 && $lecture->order == 1 ? 'is-current' : '' }} d-flex ">
                  <input type="hidden" className="lecture" value="{{ $lecture->src }}">
                  <div className="progress-toggle">
                    <label id="">
                      @if ($lecture->progress)
                        <input {{ $lecture->progress->progress ? 'checked' : '' }} value="{{ $lecture->id }}"
                          type="checkbox" name="progress" />
                      @else
                        <input value="{{ $lecture->id }}" type="checkbox" name="progress" />
                      @endif
                      <span></span>
                    </label>
                  </div>
                  <div className="link">
                    <div className="text">
                      {{ $lecture->order }}.&nbsp;{!! $lecture->title !!}
                    </div>
                    <div className="bottom d-flex align-items-center">
                      {{-- <div className="duration">
                                                  <i className="fas fa-play-circle"></i>
                                                  <span className="times">15min</span>
                                              </div> --}}

                      @if (count($lecture->resource))
                        <div className="resource-list">
                          <button className="dropdown d-flex align-items-center">
                            <i className="fas fa-folder-open"></i>
                            Resources
                            <i className="fas fa-chevron-down"></i>
                          </button>

                          <ul className="list">
                            @foreach ($lecture->resource as $resource)
                              <li>
                                <button className="d-flex download-btn align-items-center">
                                  <i className="fas fa-file-download"></i>
                                  <div className="filename">
                                    {{ $resource->original_filename }}
                                  </div>
                                </button>
                              </li>
                            @endforeach
                          </ul>

                        </div>
                      @endif
                    </div>
                  </div>
                </li>
              @endforeach
            </div>
          </div>
        @endforeach */}
          </div>
        </div>
      </div>

      <div className="content-footer">
        <div className="bar">
          <ul>
            <li className="is-current">Overview</li>
            <li>Notes</li>
          </ul>
        </div>
        <div className="content-footer__data">
          <div className="container">
            <div className="container__content">
              <div className="title">About this course</div>
              <div className="row">
                <p className="title">Description</p>
                <div className="course-description">
                  {/* $course->description  */}
                </div>
              </div>

              <div className="row">
                <p className="title">Instructor</p>
                <div className="instructor-profile">
                  <div className="header">
                    <img src="{{ asset($author->avatar) }}" alt="" />
                    <div className="profile-title">
                      <a href="route(instructor slug)">
                        {/* $author->fullname  */}
                      </a>
                      <div className="headline">
                        {/* $author->bio->headline  */}
                      </div>
                    </div>
                  </div>
                  <div className="profile-social-links">
                    {/* @if (!empty($author->bio->linkedin))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->linkedin }}"><i className="fab fa-linkedin">
                        </i></a>
                    </div>
                  </div>
                @endif
                @if (!empty($author->bio->twitter))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->twitter }}"><i className="fab fa-twitter">
                        </i>
                      </a>
                    </div>
                  </div>
                @endif
                @if (!empty($author->bio->facebook))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->facebook }}"><i className="fab fa-facebook">
                        </i></a>
                    </div>
                  </div>
                @endif
                @if (!empty($author->bio->youtube))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->youtube }}"><i className="fab fa-youtube">
                        </i></a>
                    </div>
                  </div>
                @endif */}
                  </div>
                  <div className="profile-description">
                    {/* {!! $author->bio->bio !!} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LearningPage;
