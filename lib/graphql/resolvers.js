import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import Contact from "@/lib/schema/Contact";
import sendEmail from "@/app/_components/sendEmail";

export const resolvers = {
  Query: {
    appointments: async () => {
      await Connection();
      const all = await Appointment.find({})
        .select("_id name email date subject desc status isVerifiedByAdmin")
        .lean();
      return all.map((item, index) => ({
        ...item,
        _id: item._id.toString(),
        id: index + 1,
        date: item.date ? item.date.toISOString() : new Date().toISOString(),
      }));
    },
  },
  Mutation: {
    createAppointment: async (_, { name, email, date, subject, desc }) => {
      try {
        if (!name || !email || !date || !subject || !desc) {
          return { error: "Please fill out all fields", status: 403 };
        }

        await Connection();

        const appointment = new Appointment({
          name,
          email,
          date: new Date(date),
          subject,
          desc,
        });

        const saved = await appointment.save();

        if (!saved) {
          return { error: "Appointment not booked", status: 500 };
        }

        return { message: "Appointment Booked", status: 201 };
      } catch (error) {
        return { error: error.message, status: 500 };
      }
    },

    createContact: async (_, { name, email, message }) => {
      try {
        if (!name || !email || !message) {
          return { error: "Please fill out all fields", status: 403 };
        }

        await Connection();

        const contact = new Contact({ name, email, message });
        const saved = await contact.save();

        if (!saved) {
          return { error: "Error creating contact", status: 503 };
        }

        return { message: "Submitted", status: 201 };
      } catch (error) {
        return { error: error.message, status: 500 };
      }
    },

    updateAppointmentStatus: async (_, { _id, email, name, status, date }) => {
      try {
        await Connection();

        const getDate = new Date(date);
        const options = {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        };
        const Dates = getDate.toLocaleString("en-US", options);

        const updatedDoc = await Appointment.findByIdAndUpdate(
          _id,
          { status, isVerifiedByAdmin: true, date: getDate },
          { new: true }
        );

        if (!updatedDoc) {
          return { message: "Internal Server Error", statusCode: 500 };
        }

        const sendEmailSuccess = await sendEmail(name, email, status, Dates);
        if (!sendEmailSuccess) {
          return { message: "Error in sending email", statusCode: 500 };
        }

        return { message: "success", statusCode: 201 };
      } catch (error) {
        return { message: error.message, statusCode: 500, error: error.message };
      }
    },
  },
};
