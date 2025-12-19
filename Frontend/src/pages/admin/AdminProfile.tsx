import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

interface AdminProfileData {
    user_id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profile_image?: string | null;
}

const AdminProfile = () => {
    const { user: authUser, updateUser } = useAuth();
    const [profile, setProfile] = useState<AdminProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await api.admin.getProfile();
            setProfile(data);
            setFormData({
                name: data.name || '',
                phone: data.phone || '',
                address: data.address || '',
            });
            setProfileImage(data.profile_image || null);
            setImagePreview(data.profile_image || null);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load profile');
            // Fallback to auth user data if API fails
            if (authUser) {
                setProfile({
                    user_id: authUser.user_id,
                    name: authUser.name,
                    email: authUser.email,
                    phone: authUser.phone || '',
                    address: authUser.address || '',
                    profile_image: authUser.profile_image || null,
                });
                setFormData({
                    name: authUser.name || '',
                    phone: authUser.phone || '',
                    address: authUser.address || '',
                });
                // Filter out placeholder URLs
                const validImage = authUser.profile_image && !authUser.profile_image.includes('example.com') 
                    ? authUser.profile_image 
                    : null;
                setProfileImage(validImage);
                setImagePreview(validImage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                // Convert to base64 for upload
                setProfileImage(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setSaving(true);
            const updateData = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                profile_image: profileImage,
            };
            
            const updatedProfile = await api.admin.updateProfile(updateData);
            toast.success('Profile updated successfully!');
            await fetchProfile();
            
            // Update auth context with new profile data (this will update the header immediately)
            if (authUser) {
                if (updatedProfile?.user) {
                    // If backend returns user object
                    updateUser({
                        name: updatedProfile.user.name || formData.name,
                        phone: updatedProfile.user.phone || formData.phone,
                        address: updatedProfile.user.address || formData.address,
                        profile_image: updatedProfile.user.profile_image || profileImage,
                    });
                } else {
                    // Fallback: update with form data
                    updateUser({
                        name: formData.name,
                        phone: formData.phone,
                        address: formData.address,
                        profile_image: profileImage,
                    });
                }
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return 'A';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    if (loading) {
        return (
            <div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-500 dark:text-slate-400">Loading profile...</div>
                </div>
            </div>
        );
    }

    const displayProfile = profile || authUser;
    if (!displayProfile) {
        return (
            <div>
                <div className="text-center text-slate-500 dark:text-slate-400">No profile data available</div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                <p className="text-slate-600 dark:text-slate-400">Manage your account settings</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 max-w-2xl">
                {/* Profile Header with Image Upload */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold overflow-hidden">
                            {imagePreview && !imagePreview.includes('example.com') ? (
                                <img 
                                    src={imagePreview} 
                                    alt={displayProfile.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to initials if image fails to load
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        setImagePreview(null);
                                    }}
                                />
                            ) : (
                                <span>{getInitials(displayProfile.name)}</span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer"
                        >
                            Change Photo
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{displayProfile.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400 capitalize">{(displayProfile as any).role || authUser?.role || 'Admin'}</p>
                        <p className="text-slate-500 dark:text-slate-400">{displayProfile.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Enter phone number"
                                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={displayProfile.email}
                            readOnly
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Enter address"
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
