import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";

const initialRegisterData = {
  name: "",
  email: "",
  phone: "",
  sponsorCode: "",
  sponsorName: "",
  password: "",
  acceptTerms: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialRegisterData);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ONE change handler for all fields
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ONE register function
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        mobileNo: formData.phone,
        password: formData.password,
        referralCode: formData.sponsorCode,
      };

      const response = await authAPI.register(payload);

      if (response.success) {
        toast.success("Registration successful!");
        navigate("/user/login");
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create Your Account
          </CardTitle>
          <CardDescription>Start your journey with confidence</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label>Full Name *</Label>
              <Input
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label>Phone Number *</Label>
              <Input
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            {/* Sponsor Code */}
            <div className="space-y-1">
              <Label>Sponsor Code (Optional)</Label>
              <Input
                placeholder="Enter sponsor code"
                value={formData.sponsorCode}
                onChange={(e) => handleChange("sponsorCode", e.target.value)}
              />
            </div>

            {/* Sponsor Name */}
            {/* <div className="space-y-1">
              <Label>Sponsor Name</Label>
              <Input
                disabled
                placeholder="Auto fetched"
                value={formData.sponsorName}
              />
            </div> */}

            {/* Password */}
            <div className="space-y-1">
              <Label>Password *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  handleChange("acceptTerms", !!checked)
                }
              />
              <Label className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-sky-600 underline">
                  Terms & Conditions
                </Link>
              </Label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register Now
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/user/login" className="text-sky-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
