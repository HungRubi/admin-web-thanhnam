import { NavLink } from "react-router-dom";
import icon from "../util/icon";
import { Card } from "../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useEffect, useState } from "react";

const {
  MdChevronRight,
  MdCloudUpload,
  FaFolderPlus,
  IoMdFolder,
  FaFolderOpen,
  FaTrashAlt,
  FaFileArrowDown,
  IoMdSave,
} = icon;

const FormAddFolder = ({ onClick }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    parentId: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.addFile(formData));
    onClick();
  };

  return (
    <form className="w-100 absolute px-2.5 py-5 bg-white mt-[10%] mr-[17%]"
          onSubmit={handleSubmit}>
      <h2 className="text-lg mb-2.5">Thêm thư mục</h2>

      <input
        name="name"
        onChange={handleChange}
        type="text"
        placeholder="Nhập tên folder..."
        className="focus:ring-blue-500! focus:border-blue-500! block grow py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 border-custom w-full"
      />

      <div className="flex w-full justify-end items-center mt-3 gap-2.5">
        <button type="button"
                className="px-2.5 py-1.5 border border-gray-300 text-sm"
                onClick={onClick}>
          Hủy
        </button>
        <button type="submit"
                className="px-2.5 py-1.5 bg-blue-500 border-blue-500 text-sm text-white">
          Ok
        </button>
      </div>
    </form>
  );
};

const File = () => {
  const [isModel, setIsModel] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.getFile());
  }, [dispatch]);

  // Upload file
  useEffect(() => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("parentId", selectedFolder);

    dispatch(actions.upLoad(formData));

    setSelectedFile(null);
  }, [selectedFile, selectedFolder, dispatch]);

  const handleClickUpload = () => {
    document.getElementById("hidden-file-input").click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      e.target.value = null;
    }
  };


  const rootFolders = files?.filter((item) => item.type === "folder") || [];

  let currentItems = [];

  if (selectedFolder === null) {
    const rootFolders = files.filter(f => f.type === "folder" && !f.parentId);
    const rootFiles = files.filter(f => f.type === "file" && !f.parentId);
    currentItems = [...rootFolders, ...rootFiles];
  } else {
    const folder = files.find(f => f._id === selectedFolder);
    currentItems = folder?.children || [];
  }

  const [selected, setSelected] = useState([]);
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [renameOriginal, setRenameOriginal] = useState("");
  const [renameContext, setRenameContext] = useState(null); // 'file' | 'folder'
  const handleClick = (id) => {
    setSelected(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id) // bỏ chọn nếu đã chọn
        : [...prev, id] // thêm nếu chưa chọn
    );
  };
  useEffect(() => {
    if (!renameId || renameContext !== "file") return;
    if (!selected.includes(renameId)) {
      setRenameId(null);
      setRenameValue("");
      setRenameOriginal("");
      setRenameContext(null);
    }
  }, [selected, renameId, renameContext]);

  const handleRenameClick = () => {
    if (selected.length !== 1) return;
    const target = files.find((f) => f._id === selected[0]);
    if (!target) return;
    setRenameId(target._id);
    setRenameValue(target.name || "");
    setRenameOriginal(target.name || "");
    setRenameContext("file");
  };

  const handleFolderRenameClick = (folder) => {
    setRenameId(folder._id);
    setRenameValue(folder.name || "");
    setRenameOriginal(folder.name || "");
    setRenameContext("folder");
  };

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (!renameId || !trimmed || trimmed === renameOriginal?.trim()) return;

    dispatch(
      actions.updateFileName({
        fileId: renameId,
        newName: trimmed,
      })
    );

    setRenameId(null);
    setRenameValue("");
    setRenameOriginal("");
    if (renameContext === "file") {
      setSelected([]);
    }
    setRenameContext(null);
  };

  const handleFolderDelete = (folderId) => {
    if (!folderId) return;
    dispatch(
      actions.deleteFile({
        fileIds: [folderId],
      })
    );
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
    if (renameContext === "folder" && renameId === folderId) {
      setRenameId(null);
      setRenameValue("");
      setRenameOriginal("");
      setRenameContext(null);
    }
  };

  const handleDelete = () => {
    if (!selected.length) return;
    dispatch(
      actions.deleteFile({
        fileIds: selected,
      })
    );
    setSelected([]);
    if (renameContext === "file" && renameId && selected.includes(renameId)) {
      setRenameId(null);
      setRenameValue("");
      setRenameOriginal("");
      setRenameContext(null);
    }
  };

  const showUpdateButton =
    Boolean(renameId) &&
    Boolean(renameValue.trim()) &&
    renameValue.trim() !== renameOriginal?.trim();

  return (
    <div className="relative">
      {isModel && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#00000028]">
          <FormAddFolder onClick={() => setIsModel(false)} />
        </div>
      )}

      <div className="full pt-5 px-[30px] relative">
        <div className="w-full">
          <div className="flex items-center gap-2 text-[15px] text-color">
            <NavLink to={"/"}
                     className={"hover:text-blue-600 transition duration-300 ease-linear"}>
              Dashboard
            </NavLink>
            <MdChevronRight />
            <NavLink to={"/file"} className={"text-blue-600"}>
              File
            </NavLink>
          </div>
          <h2 className="text-[35px] font-semibold mb-5 mt-2.5">Quản lý file</h2>
        </div>

        <div className="w-full gap-8 border border-[#c9c3c3d0] mb-5">
          <div className="w-full p-2.5 flex justify-between">
            <div className="flex items-center gap-2.5">
              <button
                className="flex items-center gap-2 border border-[#c9c3c3d0] px-2.5 py-1.5 bg-white text-sm"
                onClick={handleClickUpload}
              >
                <MdCloudUpload className="text-lg" />
                Tải lên
              </button>

              <input
                type="file"
                id="hidden-file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <button
                className="flex items-center gap-2 border border-[#c9c3c3d0] px-2.5 py-1.5 bg-white text-sm"
                onClick={() => setIsModel(!isModel)}
              >
                <FaFolderPlus className="text-lg" />
                Tạo thư mục con
              </button>

              {selected?.length === 1 && (
                <button
                  className="flex items-center gap-2 border border-[#c9c3c3d0] px-2.5 py-1.5 bg-white text-sm"
                  onClick={handleRenameClick}
                >
                  <FaFileArrowDown className="text-base" />
                  Đổi tên
                </button>
              )}
              {selected?.length > 0 && (
                <>
                  <button
                    className="flex items-center gap-2 border border-[#c9c3c3d0] px-2.5 py-1.5 bg-white text-sm"
                  >
                    <FaFileArrowDown className="text-base" />
                    Tải xuống
                  </button>
                  <button
                    className="flex items-center gap-2 border border-[#c9c3c3d0] px-2.5 py-1.5 bg-red-500 text-sm text-white"
                    onClick={handleDelete}
                  >
                    <FaTrashAlt className="text-base" />
                    Xóa
                  </button>
                </>
              )}
            </div>
            {showUpdateButton && (
              <button
                className="mr-5 flex items-center gap-2 border border-blue-500 text-blue-600 px-3 py-1.5 bg-blue-50 text-sm shadow-sm hover:bg-blue-100 transition"
                onClick={handleRenameSubmit}
              >
                <IoMdSave className="text-lg" />
                Cập nhật
              </button>
            )}
          </div>

          <div className="w-full border-t border-t-[#c9c3c3d0] flex">

            <div className="w-70 flex flex-col border-r border-r-[#c9c3c3d0]">

              <div
                className={`w-full px-2.5 py-1.5 flex items-center gap-2.5 border-b border-b-[#c9c3c3d0] cursor-pointer
                  ${selectedFolder === null ? "border-blue-500 bg-white" : ""}`}
                onClick={() => setSelectedFolder(null)}
              >
                {selectedFolder === null ? (
                  <FaFolderOpen className="text-lg text-blue-500" />
                ) : (
                  <IoMdFolder className="text-lg text-blue-500" />
                )}
                Files
              </div>

              {rootFolders?.map((item) => {
                const isActive = selectedFolder === item._id;
                const isEditingFolder =
                  renameContext === "folder" && renameId === item._id;
                return (
                  <div
                    key={item._id}
                    className={`w-full px-2.5 py-1.5 flex items-center gap-2.5 border-b border-b-[#c9c3c3d0] cursor-pointer group
                      ${isActive ? "border-blue-500 bg-white" : ""}`}
                    onClick={() => {
                      setSelectedFolder(item._id);
                      if (
                        renameContext === "folder" &&
                        renameId !== item._id
                      ) {
                        setRenameId(null);
                        setRenameValue("");
                        setRenameOriginal("");
                        setRenameContext(null);
                      }
                    }}
                  >
                    {isActive ? (
                      <FaFolderOpen className="text-lg text-blue-500" />
                    ) : (
                      <IoMdFolder className="text-lg text-blue-500" />
                    )}

                    {isEditingFolder ? (
                      <input
                        className="flex-1 border border-blue-500 rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-100 outline-none"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    ) : (
                      <span className="flex-1 text-sm">{item.name}</span>
                    )}

                    {isActive && (
                      <div className="flex gap-2">
                        {!isEditingFolder && (
                          <button
                            className="text-xs text-blue-600 border border-blue-500 px-2 py-0.5 rounded hover:bg-blue-50 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFolderRenameClick(item);
                            }}
                          >
                            Đổi tên
                          </button>
                        )}
                        <button
                          className="text-xs text-white bg-red-500 border border-red-500 px-2 py-0.5 rounded hover:bg-red-600 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFolderDelete(item._id);
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full p-2.5 gap-4.5 flex flex-wrap items-start overflow-y-scroll h-[calc(100vh-342px)]">
              {currentItems.map((item) => (
                item.type === "file" &&
                <Card 
                  selected={selected.includes(item._id)}
                  key={item._id} 
                  data={item} 
                  isOnClick={() => handleClick(item._id)}
                  isEditing={renameId === item._id}
                  renameValue={renameValue}
                  onRenameChange={(value) => setRenameValue(value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default File;
