package challenge.entities;

import java.util.Date;
import java.util.Objects;

public class Book {
    private int id;
    private String title;
    private Author author;
    private boolean available;
    private Date createdAt;
    private Date updatedAt;

    public Book(int id, String title, Author author) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.available = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Author getAuthor() {
        return author;
    }

    public boolean isAvailable() {
        return available;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = new Date();
    }

    public void setAvailable(boolean available) {
        this.available = available;
        this.updatedAt = new Date();
    }

    @Override
    public String toString() {
        return String.format(
            "Book{id=%d, title='%s', author=%s, available=%b, createdAt=%s, updatedAt=%s}",
            id,
            title,
            author,
            available,
            Objects.toString(createdAt, "null"),
            Objects.toString(updatedAt, "null")
        );
    }
}
