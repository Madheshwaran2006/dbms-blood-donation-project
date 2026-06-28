package com.mmy.projectdb.models;

import java.time.LocalDate;

public class donated {

    private String d_name;
    private String u_email;
    private  String p_name;
    private String d_email;
    private LocalDate donated_at;

    public String getD_name() {
        return d_name;
    }

    public void setD_name(String d_name) {
        this.d_name = d_name;
    }

    public String getU_email() {
        return u_email;
    }

    public void setU_email(String u_email) {
        this.u_email = u_email;
    }

    public String getP_name() {
        return p_name;
    }

    public void setP_name(String p_name) {
        this.p_name = p_name;
    }

    public String getD_email() {
        return d_email;
    }

    public void setD_email(String d_email) {
        this.d_email = d_email;
    }

    public LocalDate getDonated_at() {
        return donated_at;
    }

    public void setDonated_at(LocalDate donated_at) {
        this.donated_at = LocalDate.now();
    }
}
