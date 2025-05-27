package challenge.entities;

import java.util.ArrayList;
import java.util.List;

public class Library {
    private List<Book> books = new ArrayList<>();
    private List<Author> authors = new ArrayList<>();
    private List<Loan> loans = new ArrayList<>();

    public void addBook(Book book) {
        this.books.add(book);
    }

    public List<Book> listBooks() {
        return this.books;
    }

    public List<Book> listAvailableBooks() {
        List<Book> availableBooks = new ArrayList<>();
        for (Book book : books) {
            if (book.isAvailable()) {
                availableBooks.add(book);
            }
        }
        return availableBooks;
    }

    public Book findBookById(int id) {
        for (Book book : books) {
            if (book.getId() == id) {
                return book;
            }
        }
        return null;
    }

    public void updateBookTitle(int id, String newTitle) {
        for (Book book : books) {
            if (book.getId() == id) {
                book.setTitle(newTitle);
                break;
            }
        }
    }

    public void removeBook(int id) {
        books.removeIf(book -> book.getId() == id);
    }

    public void addAuthor(Author author) {
        authors.add(author);
    }

    public List<Author> listAuthors() {
        return authors;
    }

    public void updateAuthorName(int id, String newName) {
        for (Author author : authors) {
            if (author.getId() == id) {
                author.setName(newName);
                break;
            }
        }
    }

    public void removeAuthor(int id) {
        authors.removeIf(author -> author.getId() == id);
    }

    public void loanBook(Book book, String userName) {
        if (book.isAvailable()) {
            Loan loan = new Loan(book, userName);
            loans.add(loan);
            book.setAvailable(false);
        } else {
            System.out.println("Book is not available for loan.");
        }
    }

    public void returnBook(int loanId) {
        for (Loan loan : loans) {
            if (loan.getId() == loanId && loan.isActive()) {
                loan.returnBook();
                break;
            }
        }
    }

    public List<Loan> listLoans() {
        return loans;
    }
}
