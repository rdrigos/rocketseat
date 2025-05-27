package challenge.entities;

import java.util.Date;
import java.util.Objects;

public class Loan {
    private int id;
    private static int idCounter = 1;
    private Book book;
    private String userName;
    private Date loanDate;
    private Date returnDate;
    private boolean active;

    public Loan(Book book, String userName) {
        this.id = idCounter++;
        this.book = book;
        this.userName = userName;
        this.loanDate = new Date();
        this.active = true;
    }

    public int getId() {
        return id;
    }

    public Book getBook() {
        return book;
    }

    public String getUserName() {
        return userName;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public boolean isActive() {
        return active;
    }

    public void returnBook() {
        this.returnDate = new Date();
        this.active = false;
        this.book.setAvailable(true);
    }

    @Override
    public String toString() {
        return String.format(
            "Loan{id=%d, book=%s, userName='%s', loanDate=%s, returnDate=%s, active=%b}",
            id,
            book,
            userName,
            Objects.toString(loanDate, "null"),
            Objects.toString(returnDate, "null"),
            active
        );
    }
}
