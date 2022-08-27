module default {
  scalar type RemoteStatus extending enum<Fully, Partial, None>;

  scalar type Industry extending enum<"Medical", "Media", "Information Technology", "Engineering", "Science & Research", "Tradesmen", "Hospitality", "Fitness & Athletics", "Style & Fashion", "The Arts", "Agriculture", "Business & Finance">;

  scalar type OfferStatus extending enum<Pending, Accepted, Rejected>;

  scalar type ProfileVisibility extending enum<"Public", "Indirect Connections Allowed", "Direct Connections Only">;

  type User {
    required property created_at -> datetime {
      default := std::datetime_current();
      readonly := true;
    };
    required property updated_at -> datetime {
      default := std::datetime_current();
    };

    # pii
    required property email -> str {
      constraint exclusive;
      constraint min_len_value(3);
      constraint max_len_value(254);
    };
    required property username -> str {
      constraint exclusive;
      constraint min_len_value(3);
      constraint max_len_value(32);
    };
    required property first_name -> str {
      constraint min_len_value(1);
      constraint max_len_value(32);
    };
    required property last_name -> str {
      constraint min_len_value(1);
      constraint max_len_value(32);
    };
    property full_name := .first_name ++ ' ' ++ .last_name;
    property is_male -> bool{
      default := false;
    };

    # settings
    # TODO: use regex to ensure urls are coming from the storage bucket
    property avatar_url -> str; 
    property highlight_reel_url ->str;
    property is_private -> bool{
      default := false;
    };
    property is_verified -> bool {
      default := false;
    };
    property has_blue_checkmark -> bool {
      default := false;
    };
    property visibility -> ProfileVisibility {
      default := "Public";
    };

    # professional profile
    multi link professions -> Profession;
    multi link interested_jobs -> Job;

    # social networking
    multi link following -> User;
    multi link followers := .<following[is User];
    property following_count := count(.following);
    property follower_count := count(.followers);

    # localization
    link city -> City;
    link currency -> Currency;
    multi link languages -> Language;
  }

  type Brand {
    required property created_at -> datetime {
      default := std::datetime_current();
      readonly := true;
    };
    required property updated_at -> datetime {
      default := std::datetime_current();
    };
    required property name -> str;
    required property namespace -> str;
    required property industry -> Industry;
    property website -> str;
    property is_verified -> bool{
      default := false;
    };
    link ceo -> User;
    multi link representatives -> User;
    multi link jobs := .<brand[is Job];
  }

  type Job {
    required property created_at -> datetime {
      default := std::datetime_current();
      readonly := true;
    };
    required property updated_at -> datetime {
      default := std::datetime_current();
    };
    required property title -> str {
      constraint min_len_value(1);
      constraint max_len_value(128);
    };
    required property description -> str{
      constraint min_len_value(1);
      constraint max_len_value(254);
    };
    required property salary_min -> int64;
    required property salary_max -> int64;
    required property interviews_to_hire -> int16;
    required property remote_status -> RemoteStatus{
      default := "Partial";
    };
    property is_open -> bool {
      default := true;
    };
    property has_offer -> bool {
      default := false;
    };
    link brand -> Brand;
    link city -> City;
    link currency -> Currency;
    multi link languages -> Language;
    multi link interested_users := .<interested_jobs[is User];
    multi link recommended_professions -> Profession;
  }

  type Profession {
    required property title -> str;
    property industry -> Industry;
  }

  type Country {
    required property common_name -> str;
    required property official_name -> str;
    required property localized_name -> str;
    required property iso_code_2 -> str {
      constraint exclusive;
      constraint min_len_value(2);
      constraint max_len_value(2);
    };
    required property iso_code_3 -> str {
      constraint exclusive;
      constraint min_len_value(3);
      constraint max_len_value(3);
    };
    multi link cities := .<country[is City];
  }

  type City {
    required property name -> str;
    required property longitude -> float64;
    required property latitude -> float64;
    link country -> Country;
    multi link jobs := .<city[is Job];
    multi link users := .<city[is User];
    # multi link brands -> Brand;
  }

  type Language {
    required property language -> str;
    required property language_code -> str;
    required property region -> str;
    required property region_code -> str;
    # multi link users -> User;
    # multi link jobs -> Job;
  }

  type Currency {
    required property code -> str{
      constraint exclusive;
    };
    required property name -> str;
    required property symbol -> str;
    # multi link countries -> Country;
  }
}
