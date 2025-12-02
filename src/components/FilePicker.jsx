import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Card } from ".";
import icon from "../util/icon";
import * as actions from "../store/actions";

const {
  IoClose,
  MdChevronRight,
  FaFolderOpen,
  IoMdFolder,
  IoImageOutline,
  MdCloudUpload,
} = icon;

const formatSize = (bytes) => {
  if (!bytes && bytes !== 0) return "--";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const buildImageUrl = (path) =>
  path
    ? `${import.meta.env.VITE_SERVER_URL}/${path.replace(/\\/g, "/")}`
    : "";

const FilePicker = ({ label, onChange, value }) => {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.app);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [confirmedFile, setConfirmedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadInputRef = useRef(null);

  useEffect(() => {
    dispatch(actions.getFile());
  }, [dispatch]);

  const rootFolders = useMemo(
    () => (files || []).filter((item) => item.type === "folder" && !item.parentId),
    [files]
  );

  const currentItems = useMemo(() => {
    if (!files) return [];
    if (selectedFolder === null) {
      const rootFiles = files.filter((f) => f.type === "file" && !f.parentId);
      return rootFiles;
    }
    const folder = files.find((f) => f._id === selectedFolder);
    return folder?.children || [];
  }, [files, selectedFolder]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPendingFile(null);
  };

  const handleClickUpload = () => {
    uploadInputRef.current?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", selectedFolder);

    try {
      setIsUploading(true);
      await dispatch(actions.upLoad(formData));
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleConfirmSelection = () => {
    if (!pendingFile) return;
    setConfirmedFile(pendingFile);
    onChange?.(pendingFile);
    handleCloseModal();
  };

  const handleClearSelection = () => {
    setConfirmedFile(null);
    onChange?.(null);
  };

  useEffect(() => {
    if (!value) {
      setConfirmedFile(null);
      return;
    }
    if (!files?.length) return;
    if (confirmedFile?.path === value || confirmedFile?._id === value) return;

    const matched = files.find(
      (item) => item.path === value || item._id === value
    );
    if (matched) {
      setConfirmedFile(matched);
    }
  }, [value, files, confirmedFile]);

  return (
    <div>
      <h1 className="block text-[16px] font-medium text-gray-800 mt-5 mb-2.5">
        {label}
      </h1>
      <div className="mb-5">
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Chọn file
        </button>
      </div>

      <div className="w-2/3">
        {confirmedFile ? (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <img
                  src={buildImageUrl(confirmedFile.path)}
                  alt={confirmedFile.name}
                  className="w-32 h-32 object-cover rounded border border-gray-300"
                />
              </div>
              <div className="grow">
                <p className="font-medium text-gray-800 break-all text-sm">
                  Name: {confirmedFile.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Size: {formatSize(confirmedFile.size)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {confirmedFile.formatDate}
                </p>
                <p className="text-xs text-gray-500 mt-2 break-all">
                  Path: {confirmedFile.path}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearSelection}
                className="shrink-0 text-gray-400 hover:text-red-600 transition p-2"
              >
                X
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 border-2 border-dashed border-gray-300 text-center flex flex-col items-center gap-2 text-gray-400">
            <IoImageOutline className="text-3xl" />
            <p className="text-sm">Chưa có file nào được chọn</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-b-[#c9c3c3d0] gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-800">
                    Chọn file
                  </span>
                  <MdChevronRight />
                  <span className="text-blue-600 font-semibold">
                    {selectedFolder === null ? "Files" : "Thư mục con"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClickUpload}
                  className={`flex items-center gap-2 border border-[#c9c3c3d0] px-3 py-1.5 text-sm rounded ${
                    isUploading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 transition"
                  }`}
                  disabled={isUploading}
                >
                  <MdCloudUpload className="text-lg" />
                  {isUploading ? "Đang tải..." : "Tải lên"}
                </button>
                <input
                  type="file"
                  ref={uploadInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <div className="flex flex-1 overflow-y-scroll">
              <div className="w-64 flex flex-col border-r border-r-[#c9c3c3d0] bg-gray-50">
                <div
                  className={`w-full px-4 py-3 flex items-center gap-3 border-b border-b-[#c9c3c3d0] cursor-pointer ${
                    selectedFolder === null ? "border-l-4 border-blue-500 bg-white" : ""
                  }`}
                  onClick={() => setSelectedFolder(null)}
                >
                  {selectedFolder === null ? (
                    <FaFolderOpen className="text-lg text-blue-500" />
                  ) : (
                    <IoMdFolder className="text-lg text-blue-500" />
                  )}
                  Files
                </div>

                {rootFolders.map((folder) => (
                  <div
                    key={folder._id}
                    className={`w-full px-4 py-3 flex items-center gap-3 border-b border-b-[#c9c3c3d0] cursor-pointer ${
                      selectedFolder === folder._id
                        ? "border-l-4 border-blue-500 bg-white"
                        : ""
                    }`}
                    onClick={() => setSelectedFolder(folder._id)}
                  >
                    {selectedFolder === folder._id ? (
                      <FaFolderOpen className="text-lg text-blue-500" />
                    ) : (
                      <IoMdFolder className="text-lg text-blue-500" />
                    )}
                    <span className="text-sm">{folder.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 p-4 gap-4 flex flex-wrap items-start overflow-y-auto">
                {currentItems.filter((item) => item.type === "file").length === 0 && (
                  <div className="w-full text-center text-gray-400 py-20">
                    Không có file trong thư mục này
                  </div>
                )}
                {currentItems
                  .filter((item) => item.type === "file")
                  .map((item) => (
                    <Card
                      key={item._id}
                      data={item}
                      isOnClick={() => setPendingFile(item)}
                      selected={pendingFile?._id === item._id}
                    />
                  ))}
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-t-[#c9c3c3d0] bg-gray-50">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded text-sm"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded text-sm text-white ${
                  pendingFile
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleConfirmSelection}
                disabled={!pendingFile}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FilePicker.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default FilePicker;

