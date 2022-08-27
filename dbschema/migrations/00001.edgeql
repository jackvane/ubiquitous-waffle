CREATE MIGRATION m1gpd6iujtegtmhgizmfe5dmeeg2bqydxdyiujqpdosdnf4ae3i6oa
    ONTO initial
{
  CREATE SCALAR TYPE default::Industry EXTENDING enum<Medical, Media, `Information Technology`, Engineering, `Science & Research`, Tradesmen, Hospitality, `Fitness & Athletics`, `Style & Fashion`, `The Arts`, Agriculture, `Business & Finance`>;
  CREATE TYPE default::Brand {
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY industry -> default::Industry;
      CREATE PROPERTY is_verified -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY namespace -> std::str;
      CREATE REQUIRED PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY website -> std::str;
  };
  CREATE TYPE default::Currency {
      CREATE REQUIRED PROPERTY code -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY symbol -> std::str;
  };
  CREATE TYPE default::Language {
      CREATE REQUIRED PROPERTY language -> std::str;
      CREATE REQUIRED PROPERTY language_code -> std::str;
      CREATE REQUIRED PROPERTY region -> std::str;
      CREATE REQUIRED PROPERTY region_code -> std::str;
  };
  CREATE TYPE default::Profession {
      CREATE PROPERTY industry -> default::Industry;
      CREATE REQUIRED PROPERTY title -> std::str;
  };
  CREATE SCALAR TYPE default::ProfileVisibility EXTENDING enum<Public, `Indirect Connections Allowed`, `Direct Connections Only`>;
  CREATE TYPE default::User {
      CREATE LINK currency -> default::Currency;
      CREATE MULTI LINK languages -> default::Language;
      CREATE MULTI LINK professions -> default::Profession;
      CREATE MULTI LINK following -> default::User;
      CREATE MULTI LINK followers := (.<following[IS default::User]);
      CREATE PROPERTY follower_count := (std::count(.followers));
      CREATE PROPERTY following_count := (std::count(.following));
      CREATE PROPERTY avatar_url -> std::str;
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(254);
          CREATE CONSTRAINT std::min_len_value(3);
      };
      CREATE REQUIRED PROPERTY first_name -> std::str {
          CREATE CONSTRAINT std::max_len_value(32);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY last_name -> std::str {
          CREATE CONSTRAINT std::max_len_value(32);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE PROPERTY full_name := (((.first_name ++ ' ') ++ .last_name));
      CREATE PROPERTY has_blue_checkmark -> std::bool {
          SET default := false;
      };
      CREATE PROPERTY highlight_reel_url -> std::str;
      CREATE PROPERTY is_male -> std::bool {
          SET default := false;
      };
      CREATE PROPERTY is_private -> std::bool {
          SET default := false;
      };
      CREATE PROPERTY is_verified -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY username -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(32);
          CREATE CONSTRAINT std::min_len_value(3);
      };
      CREATE PROPERTY visibility -> default::ProfileVisibility {
          SET default := 'Public';
      };
  };
  ALTER TYPE default::Brand {
      CREATE LINK ceo -> default::User;
  };
  CREATE SCALAR TYPE default::RemoteStatus EXTENDING enum<Fully, Partial, None>;
  CREATE TYPE default::Job {
      CREATE LINK brand -> default::Brand;
      CREATE LINK currency -> default::Currency;
      CREATE MULTI LINK languages -> default::Language;
      CREATE MULTI LINK recommended_professions -> default::Profession;
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY description -> std::str {
          CREATE CONSTRAINT std::max_len_value(254);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE PROPERTY has_offer -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY interviews_to_hire -> std::int16;
      CREATE PROPERTY is_open -> std::bool {
          SET default := true;
      };
      CREATE REQUIRED PROPERTY remote_status -> default::RemoteStatus {
          SET default := 'Partial';
      };
      CREATE REQUIRED PROPERTY salary_max -> std::int64;
      CREATE REQUIRED PROPERTY salary_min -> std::int64;
      CREATE REQUIRED PROPERTY title -> std::str {
          CREATE CONSTRAINT std::max_len_value(128);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Brand {
      CREATE MULTI LINK jobs := (.<brand[IS default::Job]);
      CREATE MULTI LINK representatives -> default::User;
  };
  CREATE TYPE default::City {
      CREATE REQUIRED PROPERTY latitude -> std::float64;
      CREATE REQUIRED PROPERTY longitude -> std::float64;
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  CREATE TYPE default::Country {
      CREATE REQUIRED PROPERTY common_name -> std::str;
      CREATE REQUIRED PROPERTY iso_code_2 -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(2);
          CREATE CONSTRAINT std::min_len_value(2);
      };
      CREATE REQUIRED PROPERTY iso_code_3 -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(3);
          CREATE CONSTRAINT std::min_len_value(3);
      };
      CREATE REQUIRED PROPERTY localized_name -> std::str;
      CREATE REQUIRED PROPERTY official_name -> std::str;
  };
  ALTER TYPE default::City {
      CREATE LINK country -> default::Country;
  };
  ALTER TYPE default::Country {
      CREATE MULTI LINK cities := (.<country[IS default::City]);
  };
  ALTER TYPE default::Job {
      CREATE LINK city -> default::City;
  };
  ALTER TYPE default::City {
      CREATE MULTI LINK jobs := (.<city[IS default::Job]);
  };
  ALTER TYPE default::User {
      CREATE LINK city -> default::City;
      CREATE MULTI LINK interested_jobs -> default::Job;
  };
  ALTER TYPE default::City {
      CREATE MULTI LINK users := (.<city[IS default::User]);
  };
  ALTER TYPE default::Job {
      CREATE MULTI LINK interested_users := (.<interested_jobs[IS default::User]);
  };
  CREATE SCALAR TYPE default::OfferStatus EXTENDING enum<Pending, Accepted, Rejected>;
};
