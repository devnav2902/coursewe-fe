import styled from "styled-components";

export const CustomFileUpload = styled.div`
  .custom-fileupload {
    font-size: 1.6rem;
    .input-group {
      backface-visibility: hidden;
      border: 1px solid #000;
      height: 45px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      width: 100%;
      a,
      button {
        padding: 0 14px;
        border-left: 1px solid #000;
        height: 100%;
        flex-shrink: 0;
        background-color: #fff;
        font-weight: 700;
        &:hover {
          background-color: rgba(241, 241, 241, 0.425);
        }
      }

      .filepond--label-action {
        display: flex !important;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        margin-left: 0 !important;
      }
    }
    .file-upload {
      display: flex;
      align-items: center;
      padding: 0 14px;
      flex-grow: 1;
      height: 100%;
      background-color: rgba(241, 241, 241, 0.425);
    }
    .filepond--credits {
      display: none;
    }
    .filepond--panel-root {
      background-color: #fff;
    }
    .filepond--drop-label {
      label {
        padding: 0;
        width: 100%;
      }
    }
  }
`;

export const ResourceContainer = styled.div`
  &.resources {
    padding-bottom: 20px;
    > p {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .list {
      .empty-resource {
        font-size: 14px;
      }
      .item {
        padding: 0 20px 7px 0;
        font-size: 14px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(214, 214, 214);
      }
      .item__file {
        display: flex;
        align-items: center;
      }
      .filename {
        margin-left: 8px;
      }
      button {
        background: transparent;
        svg {
          color: #a1a1a1;
        }
        svg:hover {
          color: #3e4143;
        }
      }
      .icon i,
      button i {
        font-size: 13px;
      }
    }
  }
`;

export const StyledTableContaier = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(214, 214, 214);

  table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    th {
      font-weight: 700;
      border-bottom: 1px solid rgb(214, 214, 214);
    }
    td:first-child,
    th:first-child {
      width: 280px;
      max-width: 280px;
    }

    td:first-child {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding-right: 15px;
    }
    td:last-child {
      button {
        cursor: pointer;
        font-weight: 600;
        color: rgb(184, 29, 184);
        background-color: transparent;
      }
    }
    th,
    td {
      font-size: 14px;
      text-align: left;
      padding: 10px 5px;
    }
  }
`;
