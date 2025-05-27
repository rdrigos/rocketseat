package challenge;

import challenge.entities.Author;
import challenge.entities.Book;
import challenge.entities.Library;

import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Library library = new Library();
        Scanner scanner = new Scanner(System.in);

        // Adding authors
        Author author01 = new Author(1, "J.K. Rowling", new Date());
        Author author02 = new Author(2, "J.R.R. Tolkien", new Date());

        library.addAuthor(author01);
        library.addAuthor(author02);

        // Adding books
        Book book01 = new Book(1, "Harry Potter e a Pedra Filosofal", author01);
        Book book02 = new Book(2, "O Senhor dos Anéis: A Sociedade do Anel", author02);
        Book book03 = new Book(3, "Harry Potter e a Câmara Secreta", author01);

        library.addBook(book01);
        library.addBook(book02);
        library.addBook(book03);

        // Loop for user interaction
        while (true) {
            System.out.println("Do you want to see the available books? (yes/no)");
            String answer = scanner.nextLine().toLowerCase();

            if (answer.equals("yes")) {
                List<Book> availableBooks = library.listAvailableBooks();

                if (availableBooks.isEmpty()) {
                    System.out.println("There are no books available at the moment.");
                } else {
                    System.out.println("Available books:");
                    for (Book book : availableBooks) {
                        System.out.println(book.getId() + ": " + book.getTitle());
                    }

                    System.out.println("Enter the ID of the book you want to borrow:");
                    int bookId = scanner.nextInt();
                    scanner.nextLine();

                    Book selectedBook = library.findBookById(bookId);

                    if (selectedBook != null && selectedBook.isAvailable()) {
                        System.out.println("Enter your name:");
                        String userName = scanner.nextLine();

                        library.loanBook(selectedBook, userName);
                        System.out.println("The book " + selectedBook.getTitle() + " has been loaned to " + userName);
                    } else {
                        System.out.println("Book not found or not available for loan.");
                    }
                }
            } else if (answer.equals("no")) {
                System.out.println("Thank you for using the library system.");
                break;
            } else {
                System.out.println("Invalid response. Please answer with 'yes' or 'no'.");
            }
        }

        scanner.close();
    }
}
