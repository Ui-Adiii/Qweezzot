import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { authAPI } from "@/api/auth";
import {
  Loader2,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  Users,
  UserPlus,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import {
  getCountries,
  getStatesByCountry,
  getDistrictsByState,
  getCitiesByDistrict,
  type State,
  type District,
  type City,
} from "@/data/locationData";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    email: "",
    mobileNo: "",
    username: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: {
      day: "",
      month: "",
      year: "",
    },
    gender: "",

    // Communication Details
    country: "",
    state: "",
    district: "",
    city: "",
    address: "",
    pincode: "",

    // Bank & PAN Details
    accountNo: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    pancard: "",

    // Nominee Details
    nomineeName: "",
    relation: "",
    age: "",

    // Joining Details
    sponsorCode: "",
    sponsorName: "",
    position: "",

    // Terms
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sponsor code fetching state
  const [fetchingSponsor, setFetchingSponsor] = useState(false);

  // Location data states
  const [availableStates, setAvailableStates] = useState<State[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const countries = getCountries();

  // Auto-fill referral code from URL
  useEffect(() => {
    const refCode = searchParams.get("ref");
    const position = searchParams.get("pos");

    if (refCode) {
      setFormData((prev) => ({
        ...prev,
        sponsorCode: refCode,
        position: position || "",
      }));

      // Fetch sponsor name when code is set from URL
      fetchSponsorName(refCode);

      if (position) {
        toast.success(
          `Referral code ${refCode} applied for ${position} position!`
        );
      } else {
        toast.success(`Referral code ${refCode} applied!`);
      }
    }
  }, [searchParams]);

  // Function to fetch sponsor name by referral code
  const fetchSponsorName = async (sponsorCode: string) => {
    if (!sponsorCode || sponsorCode.trim() === "") {
      setFormData((prev) => ({ ...prev, sponsorName: "" }));
      return;
    }

    setFetchingSponsor(true);
    try {
      const response = await authAPI.getUserByReferralCode(sponsorCode.trim());
      if (response.success && response.data) {
        setFormData((prev) => ({
          ...prev,
          sponsorName: response.data.name || "",
        }));
        toast.success("Sponsor found!");
      } else {
        setFormData((prev) => ({ ...prev, sponsorName: "" }));
        toast.error("Sponsor not found. Please check the sponsor code.");
      }
    } catch (error: any) {
      setFormData((prev) => ({ ...prev, sponsorName: "" }));
      toast.error(error.message || "Failed to fetch sponsor details");
    } finally {
      setFetchingSponsor(false);
    }
  };

  // Debounce function for sponsor code input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.sponsorCode && formData.sponsorCode.trim() !== "") {
        fetchSponsorName(formData.sponsorCode);
      } else {
        setFormData((prev) => ({ ...prev, sponsorName: "" }));
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [formData.sponsorCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, acceptTerms, dateOfBirth, ...registerData } =
        formData;

      // Format date of birth
      const dobFormatted = `${dateOfBirth.year}-${dateOfBirth.month.padStart(
        2,
        "0"
      )}-${dateOfBirth.day.padStart(2, "0")}`;

      const finalRegisterData = {
        ...registerData,
        dateOfBirth: dobFormatted,
        referralCode: formData.sponsorCode, // Map sponsorCode to referralCode for backend
      };

      const response = await authAPI.register(finalRegisterData);

      if (response.success) {
        toast.success("Registration successful! Please login to continue.");
        navigate("/user/login");
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      // Handle cascading dropdowns - value is ID, we store the name
      if (name === "country") {
        const country = countries.find((c) => c.id === value);
        if (country) {
          setFormData((prev) => ({
            ...prev,
            country: country.name,
            state: "",
            district: "",
            city: "",
          }));
          const states = getStatesByCountry(value);
          setAvailableStates(states);
          setAvailableDistricts([]);
          setAvailableCities([]);
        }
      } else if (name === "state") {
        const state = availableStates.find((s) => s.id === value);
        if (state) {
          setFormData((prev) => ({
            ...prev,
            state: state.name,
            district: "",
            city: "",
          }));
          // Find country ID by name
          const country = countries.find((c) => c.name === formData.country);
          if (country) {
            const districts = getDistrictsByState(country.id, value);
            setAvailableDistricts(districts);
            setAvailableCities([]);
          }
        }
      } else if (name === "district") {
        const district = availableDistricts.find((d) => d.id === value);
        if (district) {
          setFormData((prev) => ({
            ...prev,
            district: district.name,
            city: "",
          }));
          // Find country and state IDs by name
          const country = countries.find((c) => c.name === formData.country);
          const state = country?.states.find((s) => s.name === formData.state);
          if (country && state) {
            const cities = getCitiesByDistrict(country.id, state.id, value);
            setAvailableCities(cities);
          }
        }
      } else if (name === "city") {
        const city = availableCities.find((c) => c.id === value);
        if (city) {
          setFormData((prev) => ({
            ...prev,
            city: city.name,
          }));
        }
      } else {
        // For non-location fields, store value directly
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  // Update available states when country is selected (by name)
  useEffect(() => {
    if (formData.country) {
      const country = countries.find((c) => c.name === formData.country);
      if (country) {
        const states = getStatesByCountry(country.id);
        setAvailableStates(states);
      } else {
        setAvailableStates([]);
        setAvailableDistricts([]);
        setAvailableCities([]);
      }
    } else {
      setAvailableStates([]);
      setAvailableDistricts([]);
      setAvailableCities([]);
    }
  }, [formData.country, countries]);

  // Update available districts when state is selected (by name)
  useEffect(() => {
    if (formData.country && formData.state) {
      const country = countries.find((c) => c.name === formData.country);
      if (country) {
        const state = country.states.find((s) => s.name === formData.state);
        if (state) {
          const districts = getDistrictsByState(country.id, state.id);
          setAvailableDistricts(districts);
        } else {
          setAvailableDistricts([]);
          setAvailableCities([]);
        }
      } else {
        setAvailableDistricts([]);
        setAvailableCities([]);
      }
    } else {
      setAvailableDistricts([]);
      setAvailableCities([]);
    }
  }, [formData.country, formData.state]);

  // Update available cities when district is selected (by name)
  useEffect(() => {
    if (formData.country && formData.state && formData.district) {
      const country = countries.find((c) => c.name === formData.country);
      if (country) {
        const state = country.states.find((s) => s.name === formData.state);
        if (state) {
          const district = state.districts.find(
            (d) => d.name === formData.district
          );
          if (district) {
            const cities = getCitiesByDistrict(
              country.id,
              state.id,
              district.id
            );
            setAvailableCities(cities);
          } else {
            setAvailableCities([]);
          }
        } else {
          setAvailableCities([]);
        }
      } else {
        setAvailableCities([]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [formData.country, formData.state, formData.district]);

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        // Check each field individually for better error messages
        const missingFields: string[] = [];

        // Helper function to check if a value is empty
        const isEmpty = (value: any): boolean => {
          return !value || (typeof value === "string" && value.trim() === "");
        };

        if (isEmpty(formData.name)) missingFields.push("Full Name");
        if (isEmpty(formData.email)) missingFields.push("Email");
        if (isEmpty(formData.mobileNo)) missingFields.push("Mobile Number");
        if (isEmpty(formData.username)) missingFields.push("Username");
        if (isEmpty(formData.password)) missingFields.push("Password");
        if (isEmpty(formData.confirmPassword))
          missingFields.push("Confirm Password");
        if (isEmpty(formData.dateOfBirth?.day))
          missingFields.push("Date of Birth (Day)");
        if (isEmpty(formData.dateOfBirth?.month))
          missingFields.push("Date of Birth (Month)");
        if (isEmpty(formData.dateOfBirth?.year))
          missingFields.push("Date of Birth (Year)");
        if (isEmpty(formData.gender)) missingFields.push("Gender");

        if (missingFields.length > 0) {
          toast.error(`Please fill in: ${missingFields.join(", ")}`);
          return false;
        }

        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return false;
        }

        return true;

      case 2:
        const isAddressValid =
          formData.country?.trim() !== "" &&
          formData.state?.trim() !== "" &&
          formData.city?.trim() !== "" &&
          formData.address?.trim() !== "" &&
          formData.pincode?.trim() !== "";

        if (!isAddressValid) {
          toast.error("Please fill in all required address fields");
        }
        return isAddressValid;

      case 3:
        return true; // Bank details are optional but at least one field should be filled if starting
      case 4:
        return true; // Nominee details are optional
      case 5:
        const isJoiningValid =
          formData.sponsorCode?.trim() !== "" &&
          formData.position?.trim() !== "" &&
          formData.acceptTerms === true;

        if (!isJoiningValid) {
          if (!formData.acceptTerms) {
            toast.error("Please accept the terms and conditions");
          } else {
            toast.error("Please fill in all required joining details");
          }
        }
        return isJoiningValid;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
    // Error messages are now shown in validateStep function
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: "Personal", icon: User },
      { number: 2, title: "Address", icon: MapPin },
      { number: 3, title: "Banking", icon: CreditCard },
      { number: 4, title: "Nominee", icon: Users },
      { number: 5, title: "Joining", icon: UserPlus },
    ];

    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.number
                      ? "bg-sky-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <IconComponent size={16} />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-sky-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.number ? "bg-sky-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPersonalDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <User size={20} className="text-sky-600" />
        <h3 className="text-lg font-semibold text-sky-600">
          Personal Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mobileNo">Mobile Number *</Label>
          <Input
            id="mobileNo"
            name="mobileNo"
            type="tel"
            value={formData.mobileNo}
            onChange={(e) => handleChange("mobileNo", e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
            disabled={loading}
            placeholder="Choose a username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Date of Birth *</Label>
        <div className="grid grid-cols-3 gap-2">
          <Select
            value={formData.dateOfBirth.day}
            onValueChange={(value) => handleChange("dateOfBirth.day", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 31 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.dateOfBirth.month}
            onValueChange={(value) => handleChange("dateOfBirth.month", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.dateOfBirth.year}
            onValueChange={(value) => handleChange("dateOfBirth.year", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 80 }, (_, i) => {
                const year = new Date().getFullYear() - i - 10;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gender *</Label>
        <Select
          value={formData.gender || ""}
          onValueChange={(value) => handleChange("gender", value)}
        >
          <SelectTrigger className={!formData.gender ? "border-red-300" : ""}>
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {!formData.gender && (
          <p className="text-xs text-red-600">Please select your gender</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
              disabled={loading}
              placeholder="Create a password"
              minLength={6}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
              disabled={loading}
              placeholder="Confirm your password"
              minLength={6}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              disabled={loading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunicationDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin size={20} className="text-sky-600" />
        <h3 className="text-lg font-semibold text-sky-600">
          Communication Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Country *</Label>
          <Select
            value={(() => {
              const country = countries.find(
                (c) => c.name === formData.country
              );
              return country?.id || "";
            })()}
            onValueChange={(value) => handleChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>State *</Label>
          <Select
            value={(() => {
              const state = availableStates.find(
                (s) => s.name === formData.state
              );
              return state?.id || "";
            })()}
            onValueChange={(value) => handleChange("state", value)}
            disabled={!formData.country}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  formData.country ? "Select State" : "Select Country First"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableStates.map((state) => (
                <SelectItem key={state.id} value={state.id}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>District *</Label>
          <Select
            value={(() => {
              const district = availableDistricts.find(
                (d) => d.name === formData.district
              );
              return district?.id || "";
            })()}
            onValueChange={(value) => handleChange("district", value)}
            disabled={!formData.state || loading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  formData.state ? "Select District" : "Select State First"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableDistricts.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>City *</Label>
          <Select
            value={(() => {
              const city = availableCities.find(
                (c) => c.name === formData.city
              );
              return city?.id || "";
            })()}
            onValueChange={(value) => handleChange("city", value)}
            disabled={!formData.district || loading}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  formData.district ? "Select City" : "Select District First"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableCities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          required
          disabled={loading}
          placeholder="Enter your complete address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode *</Label>
        <Input
          id="pincode"
          name="pincode"
          type="text"
          value={formData.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
          required
          disabled={loading}
          placeholder="Enter your pincode"
          maxLength={6}
        />
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard size={20} className="text-sky-600" />
        <h3 className="text-lg font-semibold text-sky-600">
          Bank & PAN Details
        </h3>
        <span className="text-sm text-gray-500">(Optional)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountNo">Account Number</Label>
          <Input
            id="accountNo"
            name="accountNo"
            type="text"
            value={formData.accountNo}
            onChange={(e) => handleChange("accountNo", e.target.value)}
            disabled={loading}
            placeholder="Enter account number"
          />
        </div>

        <div className="space-y-2">
          <Label>Bank Name</Label>
          <Select
            value={formData.bankName}
            onValueChange={(value) => handleChange("bankName", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sbi">State Bank of India</SelectItem>
              <SelectItem value="hdfc">HDFC Bank</SelectItem>
              <SelectItem value="icici">ICICI Bank</SelectItem>
              <SelectItem value="axis">Axis Bank</SelectItem>
              <SelectItem value="pnb">Punjab National Bank</SelectItem>
              <SelectItem value="bob">Bank of Baroda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="branchName">Branch Name</Label>
          <Input
            id="branchName"
            name="branchName"
            type="text"
            value={formData.branchName}
            onChange={(e) => handleChange("branchName", e.target.value)}
            disabled={loading}
            placeholder="Enter branch name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            name="ifscCode"
            type="text"
            value={formData.ifscCode}
            onChange={(e) =>
              handleChange("ifscCode", e.target.value.toUpperCase())
            }
            disabled={loading}
            placeholder="Enter IFSC code"
            maxLength={11}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pancard">PAN Card Number</Label>
        <Input
          id="pancard"
          name="pancard"
          type="text"
          value={formData.pancard}
          onChange={(e) =>
            handleChange("pancard", e.target.value.toUpperCase())
          }
          disabled={loading}
          placeholder="Enter PAN card number"
          maxLength={10}
        />
      </div>
    </div>
  );

  const renderNomineeDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Users size={20} className="text-sky-600" />
        <h3 className="text-lg font-semibold text-sky-600">Nominee Details</h3>
        <span className="text-sm text-gray-500">(Optional)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomineeName">Nominee Name</Label>
          <Input
            id="nomineeName"
            name="nomineeName"
            type="text"
            value={formData.nomineeName}
            onChange={(e) => handleChange("nomineeName", e.target.value)}
            disabled={loading}
            placeholder="Enter nominee name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relation">Relation</Label>
          <Input
            id="relation"
            name="relation"
            type="text"
            value={formData.relation}
            onChange={(e) => handleChange("relation", e.target.value)}
            disabled={loading}
            placeholder="e.g., Father, Mother, Spouse"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            disabled={loading}
            placeholder="Enter age"
            min="1"
            max="120"
          />
        </div>
      </div>
    </div>
  );

  const renderJoiningDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <UserPlus size={20} className="text-sky-600" />
        <h3 className="text-lg font-semibold text-sky-600">Joining Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sponsorCode">Sponsor Code *</Label>
          <Input
            id="sponsorCode"
            name="sponsorCode"
            type="text"
            value={formData.sponsorCode}
            onChange={(e) => handleChange("sponsorCode", e.target.value)}
            required
            disabled={loading || fetchingSponsor}
            placeholder="Enter sponsor code"
            className={fetchingSponsor ? "opacity-70" : ""}
          />
          {fetchingSponsor && (
            <p className="text-xs text-sky-600 flex items-center">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Fetching sponsor details...
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sponsorName">Sponsor Name</Label>
          <Input
            id="sponsorName"
            name="sponsorName"
            type="text"
            value={formData.sponsorName}
            readOnly
            disabled={loading || fetchingSponsor}
            placeholder={
              fetchingSponsor
                ? "Fetching..."
                : formData.sponsorCode
                ? "Enter sponsor code to fetch name"
                : "Enter sponsor code to fetch name"
            }
            className="bg-gray-50 cursor-not-allowed"
          />
          {formData.sponsorName && (
            <p className="text-xs text-sky-600">✓ Sponsor verified</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Position *</Label>
        <Select
          value={formData.position}
          onValueChange={(value) => handleChange("position", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 mt-6">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, acceptTerms: !!checked }))
          }
        />
        <Label htmlFor="acceptTerms" className="text-sm">
          I accept all terms and conditions *
        </Label>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalDetails();
      case 2:
        return renderCommunicationDetails();
      case 3:
        return renderBankDetails();
      case 4:
        return renderNomineeDetails();
      case 5:
        return renderJoiningDetails();
      default:
        return renderPersonalDetails();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Membership Form
            </CardTitle>
            <CardDescription>
              Complete your registration to join Osfigo
            </CardDescription>
          </CardHeader>

          <CardContent>
            {renderStepIndicator()}

            <form onSubmit={handleSubmit}>
              <div className="min-h-[500px]">{renderCurrentStep()}</div>

              <Separator className="my-6" />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1 || loading}
                >
                  Previous
                </Button>

                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={loading}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading || !formData.acceptTerms}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Registration
                  </Button>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="justify-center space-y-4">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/user/login" className="text-sky-600 hover:underline">
                Sign in here
              </Link>
            </div>
            <div className="text-sm text-center">
              <Link to="/" className="text-gray-600 hover:underline">
                ← Back to Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserRegister;
