import { Upload } from "lucide-react"; // Replace with your icon import
import { Button } from "./ui/button";

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  buttonText: string;
}

const UploadVideo: React.FC<VideoUploadProps> = ({
  onVideoSelect,
  buttonText,
}) => {
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onVideoSelect(file);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
        id="video-upload"
      />
      <label htmlFor="video-upload">
        <Button variant="outline" className="w-full max-w-sm" asChild>
          <span className="p-2 p-2 px-2 pl-2 pr-2 flex flex-wrap h-full text-[12px] bg-[#202020] ">
            <Upload className="w-4 h-4 mr-2" />
            {buttonText}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default UploadVideo;
