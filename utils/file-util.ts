class FileUtil {
  static getFileRealURL(storagePath: string) {
    return "http://localhost:3000" + storagePath.substring(1);
  }
}

export default FileUtil;
