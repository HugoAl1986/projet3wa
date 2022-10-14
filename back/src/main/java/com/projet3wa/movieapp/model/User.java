package com.projet3wa.movieapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="user")
@NoArgsConstructor
public class User {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false)
    @Getter
    @Setter
    private String email;

    @Column(name = "password")
    @Getter
    @Setter
    private String password;

    @Column(name = "role")
    @Getter
    private String role;

    public void setRole() {
        if(this.email.equals("admin@admin")){
            this.role = "admin";
        }else{
            this.role = "user";
        }
    }
}
