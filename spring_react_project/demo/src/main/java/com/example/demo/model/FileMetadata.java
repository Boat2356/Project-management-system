package com.example.demo.model;

public class FileMetadata {
    private String filename;
    private String filePath;
    private String fileType;

    // Constructor
    public FileMetadata(String filename, String filePath, String fileType) {
        this.filename = filename;
        this.filePath = filePath;
        this.fileType = fileType;
    }

    // Getters and setters
    public String getFileType() {
        return fileType;
    }
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
