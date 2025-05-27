package challenge.entities;

import java.util.Date;
import java.util.Objects;

public class Author {
    private int id;
    private String name;
    private Date birthDate;

    public Author(int id, String name, Date birthDate) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public String toString() {
        return String.format(
            "Author{id=%d, name='%s', birthDate=%s}",
            id,
            name,
            Objects.toString(birthDate, "null")
        );
    }
}
